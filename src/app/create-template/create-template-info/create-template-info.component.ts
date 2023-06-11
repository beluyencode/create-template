import { Component, OnInit } from '@angular/core';
import { BackgroundTemplate, FontWeight, ObjectId, Template, TemplateGroup, TypeAction, TypeAlign, TypeScreen, TypeTemplate, apiUrl, checkInState, FontFamily, sampleTemplate, sampleTemplateValue } from '../create-template';
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
  checkOptionValue = checkInState.ERROR;
  sampleTemplate = sampleTemplate;
  selectSampleTemplate = sampleTemplate[0].value;
  checkOption: any = Object.values(checkInState).map((ele: string) => {
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
  fontWeight = FontWeight;
  fontFamily = FontFamily;

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

  changeStateCheckin(event: any) {
    this.createTemplateService.changeStateCheckIn(event);

  }

  uploadImg(event: any, isCheckIn?: any) {
    const file = event.target.files[0];
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];
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

  isGroup(ele: any) {
    if (ele instanceof TemplateGroup) {
      return true;
    }
    return false;
  }

  removeInfo(info: any) {
    this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType].right.content.listRow =
      this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType].right.content.listRow.filter((item: any) => item.id !== info.id);
  }

  copySameCheckin() {
    const prev = this.activeTemplate.checkInOptions[this.activeTemplate.checkInOptions.activeType];
    (this.activeTemplate as Template).checkInOptions.notFound = { ...prev };
    (this.activeTemplate as Template).checkInOptions.checkIn = { ...prev };
    (this.activeTemplate as Template).checkInOptions.checkedIn = { ...prev };
    this.toastr.success('Trạng thái check in, đã check in và lỗi đã được cài đặt giống nhau');
  }

  setSampleTemplate() {
    const newGroup = new TemplateGroup('');
    this.createTemplateService.listElement.push(newGroup.clone().convertType({
      ...sampleTemplateValue[this.selectSampleTemplate],
      data: sampleTemplateValue[this.selectSampleTemplate].data.map((ele2: any) => {
        const newTemplate = new Template('', 0);
        newTemplate.idGroup = newGroup.id;
        return newTemplate.clone().convertType(ele2);
      })
    }));
    this.createTemplateService.load_list_element.next(this.createTemplateService.listElement);

  }

}
