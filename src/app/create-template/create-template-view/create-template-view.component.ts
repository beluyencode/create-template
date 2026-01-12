import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Template, TemplateGroup, TypeScreen } from '../create-template';
import { CreateTemplateService } from '../create-template.service';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-template-view',
  templateUrl: './create-template-view.component.html',
  styleUrls: ['./create-template-view.component.scss']
})
export class CreateTemplateViewComponent implements OnInit, AfterViewInit {
  edit: boolean = true;
  @ViewChild('eleView') ele: ElementRef;
  @ViewChild('eleViewParent') eleParent: ElementRef;
  listTemplate: any[];
  typeScreen = TypeScreen;
  scale: number;
  loading = false;
  idTemplate = '';

  constructor(
    public createTemplateService: CreateTemplateService,
    private renderer2: Renderer2,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeScale();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.changeScale();
  }

  ngOnInit(): void {
    this.createTemplateService.edit.asObservable().subscribe((res: boolean) => {
      console.log(res);

      this.edit = res;
    })
    this.createTemplateService.listen_id_template().subscribe((res: string) => {
      if (res !== '') {
        this.idTemplate = res;
      }
    })
    this.createTemplateService.listen_change_scale_screen().subscribe((res: any) => {
      if (res) {
        setTimeout(() => {
          this.changeScale();
        });
      }
    });
    this.createTemplateService.listen_change_list_element().subscribe((res: Template[]) => {
      if (res) {
        this.listTemplate = res;
        setTimeout(() => {
          this.changeScale();
        });
      }
    });
    this.createTemplateService.loading.asObservable().subscribe((res: boolean) => {
      this.loading = res;
    })
    this.createTemplateService.listen_save_to_img().subscribe((res: boolean) => {
      this.edit = !res;
      if (res) {
        this.createTemplateService.active_template.next(null);
        this.renderer2.setStyle(this.ele.nativeElement, 'width', 99 + '%');
        this.loading = true;
        if (this.createTemplateService.background.scale === this.typeScreen.PC) {
          this.renderer2.setStyle(this.ele.nativeElement, 'width', 2560 + 'px');
        } else {
          this.renderer2.setStyle(this.ele.nativeElement, 'width', 1059 + 'px');
          this.renderer2.setStyle(this.ele.nativeElement, 'height', 2118 + 'px');
        }
        this.changeScale();
        setTimeout(() => {
          html2canvas(this.ele.nativeElement, { useCORS: true }).then((canvas: any) => {
            const a = this.renderer2.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = 'test.png';
            a.click();
            this.renderer2.setStyle(this.ele.nativeElement, 'width', '100%');
            if (this.createTemplateService.background.scale === this.typeScreen.MOBILE) {
              this.renderer2.setStyle(this.ele.nativeElement, 'height', '100%');

            }
            this.changeScale();
            this.loading = false;
            this.createTemplateService.save_to_img.next(false);
          })
        });
      }
    });
    this.createTemplateService.listen_save_config().subscribe((res: any) => {
      if (this.createTemplateService.isTemplateEvent) {
        this.createTemplateService.saveConfigEvent({
          config: {
            background: this.createTemplateService.background,
            listElement: this.createTemplateService.listElement
          }
        }).subscribe((res2) => {
          if (res2) {
            this.toastr.success('Lưu thành công');
          }
        })
      } else {
        this.edit = !res;
        if (res) {
          this.createTemplateService.active_template.next(null);
          this.renderer2.setStyle(this.ele.nativeElement, 'width', 99 + '%');
          this.loading = true;
          if (this.createTemplateService.background.scale === this.typeScreen.PC) {
            this.renderer2.setStyle(this.ele.nativeElement, 'width', 2560 + 'px');
          } else {
            if (this.createTemplateService.background.scale === this.typeScreen.AlMAZ) {
              this.renderer2.setStyle(this.ele.nativeElement, 'width', 1059 + 'px');
              this.renderer2.setStyle(this.ele.nativeElement, 'height', 1766 + 'px');
            } else if (this.createTemplateService.background.scale === this.typeScreen.MOBILE) {
              this.renderer2.setStyle(this.ele.nativeElement, 'width', 1059 + 'px');
              this.renderer2.setStyle(this.ele.nativeElement, 'height', 1883 + 'px');
            } else {
              this.renderer2.setStyle(this.ele.nativeElement, 'width', 1059 + 'px');
              this.renderer2.setStyle(this.ele.nativeElement, 'height', 2118 + 'px');
            }
          }
          this.changeScale();
          setTimeout(() => {
            if (this.idTemplate) {
              this.createTemplateService.saveConfig({
                html_content: `<html><head> <style>@font-face {
                    font-family: 'MMC';
                    src: url('https://api.dev.qrclc.com/static/mmc-bold_urs_d0im0sa9io6s73ejmeg02025-12-10 22:13:37.948316248 +0700 +07.woff2') format('woff2');
                    font-weight: 700;
                    font-style: normal;
                    font-display: swap;
                }

                @font-face {
                    font-family: 'MMC';
                    src: url('https://api.dev.qrclc.com/static/mmc-medium_urs_d0im0sa9io6s73ejmeg02025-12-10 22:12:29.604910111 +0700 +07.woff2') format('woff2');
                    font-weight: 500;
                    font-style: normal;
                    font-display: swap;
                }</style></head><body>${(this.eleParent.nativeElement as HTMLDivElement).innerHTML}</body></html>`,
                config: {
                  background: this.createTemplateService.background,
                  listElement: this.createTemplateService.listElement
                },
                width: this.createTemplateService.background.scale === this.typeScreen.PC ? 2560 : 1059,
                height: this.createTemplateService.background.scale === this.typeScreen.PC ? 1440 :
                  (this.createTemplateService.background.scale === this.typeScreen.AlMAZ ? 1766 :
                    (this.createTemplateService.background.scale === this.typeScreen.MOBILE ? 1883 : 2118)),
              }, this.idTemplate).subscribe((res: any) => {
                this.renderer2.setStyle(this.ele.nativeElement, 'width', '100%');
                if (this.createTemplateService.background.scale === this.typeScreen.MOBILE) {
                  this.renderer2.setStyle(this.ele.nativeElement, 'height', '100%');
                }
                this.changeScale();
                this.loading = false;
                this.createTemplateService.save_config.next(false);
                this.toastr.success('Lưu thành công');
              })
            } else {
              this.renderer2.setStyle(this.ele.nativeElement, 'width', '100%');
              if (this.createTemplateService.background.scale === this.typeScreen.MOBILE) {
                this.renderer2.setStyle(this.ele.nativeElement, 'height', '100%');
              }
              this.changeScale();
              this.loading = false;
              this.createTemplateService.save_config.next(false);
              this.loading = false;
            }
          });
        }
      }
    })
    this.createTemplateService.listen_full_screen().subscribe((res: boolean) => {
      if (res && this.createTemplateService.background.scale === TypeScreen.PC) {
        if (this.ele.nativeElement.requestFullscreen) {
          this.ele.nativeElement.requestFullscreen();
        } else if (this.ele.nativeElement.webkitRequestFullscreen) { /* Safari */
          this.ele.nativeElement.webkitRequestFullscreen();
        } else if (this.ele.nativeElement.msRequestFullscreen) { /* IE11 */
          this.ele.nativeElement.msRequestFullscreen();
        }
      }
    });
  }

  changeScale() {
    if (this.createTemplateService.background.scale === this.typeScreen.MOBILE) {
      this.createTemplateService.scaleDefault = 353;
    } else {
      this.createTemplateService.scaleDefault = 854;
      if (this.createTemplateService.background.scale === this.typeScreen.AlMAZ) {
        this.createTemplateService.scaleDefault = 424;
      }
    }
    this.scale = (this.ele.nativeElement as HTMLDivElement).clientWidth / this.createTemplateService.scaleDefault;
    this.createTemplateService.currentWidth = (this.ele.nativeElement as HTMLDivElement).clientWidth;
    this.createTemplateService.currentHeight = (this.ele.nativeElement as HTMLDivElement).clientHeight;
  }

  isGroup(ele: Template | TemplateGroup) {
    if (ele instanceof Template) {
      return false;
    }
    return true;
  }

  mouseOver(e: MouseEvent) {

  }

  wheel(event: WheelEvent) {
    // if (event.deltaY > 0) {
    //   // console.log(ele.clientWidth);
    //   this.renderer2.setStyle(this.ele.nativeElement, 'width', this.ele.nativeElement.clientWidth + 20 + 'px');
    // } else {
    //   console.log("Scrolling up");
    //   // Perform actions for scrolling up
    //   this.renderer2.setStyle(this.ele.nativeElement, 'width', this.ele.nativeElement.clientWidth - 20 + 'px');

    // }
  }

  selectBackground() {
    // this.createTemplateService.active_template.next(null);
  }

}
