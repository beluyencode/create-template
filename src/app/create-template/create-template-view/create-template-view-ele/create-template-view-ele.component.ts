import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Template, TemplateGroup, TypeTemplate, checkInState } from '../../create-template';
import { CreateTemplateService } from '../../create-template.service';

@Component({
  selector: 'app-create-template-view-ele',
  templateUrl: './create-template-view-ele.component.html',
  styleUrls: ['./create-template-view-ele.component.scss']
})
export class CreateTemplateViewEleComponent implements OnInit, AfterViewInit {
  @ViewChild('ele') ele: ElementRef;
  @Input() data: Template | any;
  @Input() scale: number;
  @Input() edit: boolean = true;
  private _listeners: any = [];
  activeTemplate: Template | null;
  isSelect = false;
  typeTemplate = TypeTemplate;
  checkOption = Object.values(checkInState).map((ele: string) => {
    switch (ele) {
      case checkInState.ERROR:
        return {
          label: 'lỗi',
          value: 'notFound'
        }
      case checkInState.CHECKED:
        return {
          label: 'đã check in',
          value: 'checkedIn'
        }
      case checkInState.CHECKIN:
        return {
          label: 'check in',
          value: 'checkIn'
        }
      default:
        return null;
    }
  });
  prevSize = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  prevPos = {
    x: 0,
    y: 0
  }

  constructor(
    public createTemplateService: CreateTemplateService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    if (this.edit) {
      this.createTemplateService.listen_active_template().subscribe((res: Template | null) => {
        this.activeTemplate = res;
        if (this.data.id === this.activeTemplate?.id) {
          this.isSelect = true;
        } else {
          this.isSelect = false;
        }
      })
    }
  }

  active(event: MouseEvent) {
    event.stopPropagation();
    this.createTemplateService.active_template.next(this.data);
  }

  changeSize(event: MouseEvent) {
    event.stopPropagation();
    console.log(this.data);

    if (this.isSelect) {
      this.prevSize = {
        x: event.clientX,
        y: event.clientY,
        width: this.activeTemplate?.type !== TypeTemplate.CHECK_IN ? this.data.width : this.data.checkInOptions[this.data.checkInOptions.activeType].width,
        height: this.activeTemplate?.type !== TypeTemplate.CHECK_IN ? this.data.height : this.data.checkInOptions[this.data.checkInOptions.activeType].height
      };
      console.log(this.prevSize);

      this._listeners.push(
        this.renderer.listen(document, 'mousemove', (e) => {
          const dx = e.clientX - this.prevSize.x;
          const dy = e.clientY - this.prevSize.y;
          if (this.activeTemplate?.type !== TypeTemplate.CHECK_IN) {
            this.data.width = Math.round(this.prevSize.width + (Math.round((dx / this.scale) * 100) / 100));
            this.data.height = Math.round(this.prevSize.height + (Math.round((dy / this.scale) * 100) / 100));
          } else {
            this.data.checkInOptions[this.data.checkInOptions.activeType].width = Math.round(this.prevSize.width + (Math.round((dx / this.scale) * 100) / 100));
            this.data.checkInOptions[this.data.checkInOptions.activeType].height = Math.round(this.prevSize.height + (Math.round((dy / this.scale) * 100) / 100));
          }
        })
      );
      this.cancelListenMouseUp();
    }
  }

  moveEle(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (this.isSelect && this.edit) {
      this.prevPos = {
        x: event.clientX,
        y: event.clientY
      };
      this._listeners.push(
        this.renderer.listen(document, 'mousemove', (e) => {
          const deltaX = e.clientX - this.prevPos.x;
          const deltaY = e.clientY - this.prevPos.y;
          const newX = this.data.x + +(deltaX * 100 / (this.data.idGroup ? ((this.createTemplateService.listElement.find((ele: any) => ele.id === this.data.idGroup)?.width || 0) * this.scale) : this.createTemplateService.currentWidth)).toFixed(2);
          const newY = this.data.y + +(deltaY * 100 / (this.data.idGroup ? ((this.createTemplateService.listElement.find((ele: any) => ele.id === this.data.idGroup)?.height || 0) * this.scale) : this.createTemplateService.currentHeight)).toFixed(2);
          const filterAlignLeft = this.createTemplateService.listElement.filter((ele: Template | TemplateGroup) => this.data.id !== ele.id)
            .filter((ele: Template | TemplateGroup) => +(ele.x).toFixed(2) - +newX.toFixed(2) > -.5 && +(ele.x).toFixed(2) - +newX.toFixed(2) < .5);
          const filterAlignTop = this.createTemplateService.listElement.filter((ele: Template | TemplateGroup) => this.data.id !== ele.id)
            .filter((ele: Template | TemplateGroup) => +(ele.y).toFixed(2) - +newY.toFixed(2) > -.5 && +(ele.y).toFixed(2) - +newY.toFixed(2) < .5);
          if (filterAlignLeft.length || filterAlignTop.length) {
            if (filterAlignLeft.length) {
              this.data.x = filterAlignLeft[0].x;
            } else {
              this.data.x = +newX.toFixed(2);
            }
            if (filterAlignTop.length) {
              this.data.y = filterAlignTop[0].y;
            } else {
              this.data.y = +newY.toFixed(2);
            }
          } else {
            this.data.x = newX;
            this.data.y = newY;
          }
          this.prevPos = {
            x: e.clientX,
            y: e.clientY
          };
        })
      );
      this.cancelListenMouseUp();
    }
  }

  rotate(event: MouseEvent) {
    if (this.isSelect) {
      event.preventDefault();
      event.stopPropagation();
      let boxBoundingRect = this.ele.nativeElement.getBoundingClientRect();
      let boxCenter = {
        x: boxBoundingRect.left + boxBoundingRect.width / 2,
        y: boxBoundingRect.top + boxBoundingRect.height / 2
      };
      this._listeners.push(
        this.renderer.listen(document, 'mousemove', (e) => {
          let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y)) * (180 / Math.PI);
          this.data.rotate = Math.round(angle);
        })
      )
      this.cancelListenMouseUp();
    }
  }

  cancelListenMouseUp() {
    this._listeners.push(
      this.renderer.listen(document, 'mouseup', (e) => {
        this._listeners.forEach((fn: Function) => fn());
        this._listeners = [];
      })
    );
  }

}
