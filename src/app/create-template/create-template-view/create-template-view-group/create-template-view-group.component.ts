import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Template, TemplateGroup } from '../../create-template';
import { CreateTemplateService } from '../../create-template.service';

@Component({
  selector: 'app-create-template-view-group',
  templateUrl: './create-template-view-group.component.html',
  styleUrls: ['./create-template-view-group.component.scss']
})
export class CreateTemplateViewGroupComponent implements OnInit {
  @ViewChild('ele') ele: ElementRef;
  @Input() data: TemplateGroup;
  @Input() scale: number;
  edit: boolean;
  isSelect = false;
  private _listeners: any = [];
  activeTemplate: Template | null;
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

  ngOnInit(): void {
    this.createTemplateService.edit.asObservable().subscribe((res: boolean) => {
      this.edit = res;
    });
    if (this.edit) {
      this.createTemplateService.listen_active_template().subscribe((res: Template | null) => {
        this.activeTemplate = res;
        if (this.data.id === this.activeTemplate?.id) {
          this.isSelect = true;
        } else {
          this.isSelect = false;
        }
      });
    }
  }

  active(event: MouseEvent) {
    if (this.edit) {
      event.stopPropagation();
      this.createTemplateService.active_template.next(this.data);
    }
  }

  changeSize(event: MouseEvent) {
    event.stopPropagation();
    if (this.isSelect) {
      this.prevSize = {
        x: event.clientX,
        y: event.clientY,
        width: this.data.width,
        height: this.data.height
      }
      this._listeners.push(
        this.renderer.listen(document, 'mousemove', (e) => {
          const dx = e.clientX - this.prevSize.x;
          const dy = e.clientY - this.prevSize.y;
          this.data.width = this.prevSize.width + (Math.round((dx / this.scale) * 100) / 100);
          this.data.height = this.prevSize.height + (Math.round((dy / this.scale) * 100) / 100);
        })
      );
      this.cancelListenMouseUp();
    }
  }

  moveEle(event: MouseEvent) {
    if (this.isSelect && this.edit) {
      this.prevPos = {
        x: event.clientX,
        y: event.clientY
      };
      this._listeners.push(
        this.renderer.listen(document, 'mousemove', (e) => {
          const deltaX = e.clientX - this.prevPos.x;
          const deltaY = e.clientY - this.prevPos.y;
          const newX = this.data.x + +(deltaX * 100 / this.createTemplateService.currentWidth).toFixed(2);
          const newY = this.data.y + +(deltaY * 100 / this.createTemplateService.currentHeight).toFixed(2);
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

  cancelListenMouseUp() {
    this._listeners.push(
      this.renderer.listen(document, 'mouseup', (e) => {
        this._listeners.forEach((fn: Function) => fn());
        this._listeners = [];
      })
    );
  }

}
