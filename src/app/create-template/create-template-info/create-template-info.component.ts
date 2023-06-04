import { Component, OnInit } from '@angular/core';
import { BackgroundTemplate, ObjectId, Template, TypeAction, TypeAlign, TypeScreen, TypeTemplate, apiUrl } from '../create-template';
import { CreateTemplateService } from '../create-template.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-template-info',
  templateUrl: './create-template-info.component.html',
  styleUrls: ['./create-template-info.component.scss']
})
export class CreateTemplateInfoComponent implements OnInit {
  activeTemplate: any;
  isTemplate = false;
  typeAlign: Array<string> = Object.values(TypeAlign);
  typeScreen = Object.values(TypeScreen);
  typeTemplateArray = Object.values(TypeTemplate);
  typeTemplateArrayCheckIn = Object.values(TypeTemplate).filter(ele => ele !== TypeTemplate.CHECK_IN);
  typeTemplate = TypeTemplate;

  constructor(
    public createTemplateService: CreateTemplateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_active_template().subscribe((res: Template) => {
      if (res) {
        this.activeTemplate = res;
        this.isTemplate = true;
      } else {
        this.activeTemplate = this.createTemplateService.background;
        this.isTemplate = false;
      }
    })
  }

  saveAttr() {
    this.createTemplateService.changeTemplate(TypeAction.CHANGE, this.activeTemplate);
  }

  changeScale(value: string) {
    this.createTemplateService.changeScaleScreen.next(value);
  }

  uploadImg(event: any, isCheckIn?: any) {
    const file = event.target.files[0];
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (file) {
      if (!validImageTypes.includes(fileType)) {
        this.toastr.error('file không đúng định dạng');
        event.target.value = '';

      } else {
        const form = new FormData();
        form.append('file', file);
        this.createTemplateService.loading.next(true);
        this.createTemplateService.uploadImg(form).subscribe((res: any) => {
          event.target.value = '';
          if (res?.code === 200) {
            this.toastr.success('Upload ảnh thành công');
            if (isCheckIn) {
              this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType].url = apiUrl.origin + apiUrl.static + res.data.path;
            } else {
              if (this.isTemplate) {
                this.activeTemplate.url = apiUrl.origin + apiUrl.static + res.data.path;
              } else {
                this.createTemplateService.background.url = apiUrl.origin + apiUrl.static + res.data.path;
              }
            }
          } else {
            this.toastr.error('Upload ảnh không thành công');
          }
          this.createTemplateService.loading.next(false);
        });
      }
    }
  }

  addMoreInfo() {
    this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType].right.content.listRow.push({
      fontSizeContent: 10,
      fontSizeValue: 10,
      colorContent: 'black',
      colorValue: 'black',
      content: 'Họ và tên',
      value: 'Phạm Việt Long',
      hidden: false,
      id: ObjectId()
    })
  }

  removeInfo(info: any) {
    this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType].right.content.listRow =
      this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType].right.content.listRow.filter((item: any) => item.id !== info.id);
  }

}
