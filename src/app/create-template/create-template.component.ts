import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Template, TemplateGroup, TypeScreen } from './create-template';
import { CreateTemplateService } from './create-template.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  providers: [
    CreateTemplateService
  ]
})
export class CreateTemplateComponent implements OnInit {
  @ViewChild('view') ele: ElementRef;
  @Input() edit = true;
  typeScreen = TypeScreen;


  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data.event) {
      this.createTemplateService.listValueDynamic = [
        {
          value: '{{name}}',
          label: 'Tên'
        }, {
          value: '{{phone}}',
          label: 'Số điện thoại'
        }, {
          value: '{{address}}',
          label: 'Địa chỉ'
        }, {
          value: '{{rank["name"]}}',
          label: 'Hạng khách hàng'
        },
        {
          value: '{{time_checkin}}',
          label: 'Thời gian check in'
        },
        ...event.data.event.params_name.map((ele: string) => {
          return {
            value: `{{params["${ele}"] }}`,
            label: ele
          }
        })
      ];
      this.createTemplateService.listQrValueDynamic = [{
        value: 'https://api.dev.qrclc.com/api/guest/qrcode/{{_id}}',
        label: 'QR code'
      }]
    }
    this.createTemplateService.idTemplate.next(event.data.idTemplate);
  }

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngOnInit(): void {
    this.createTemplateService.getTemplateSample().subscribe((res: any) => {
      const newTemplateGroup = new TemplateGroup('');
      const newTemplate = new Template('', 0);
      this.createTemplateService.listElement = res.map((ele: any) => {
        if (ele.data) {
          return newTemplateGroup.clone().convertType({
            ...ele,
            data: ele.data.map((ele2: any) => {
              return newTemplate.clone().convertType(ele2);
            })
          });
        } else {
          return newTemplate.clone().convertType(ele);
        }
      })
      console.log(this.createTemplateService.listElement);

      this.createTemplateService.load_list_element.next(this.createTemplateService.listElement);
    })
    this.createTemplateService.listen_id_template().subscribe((res: string) => {
      if (res !== '' && typeof res === 'string') {
        this.createTemplateService.getData(res).subscribe((res: any) => {
          if (res?.data?.config) {
            if (res?.data?.config?.background) {
              this.createTemplateService.background = res?.data?.config?.background;
              this.createTemplateService.active_template.next(null);
            }
            if (res?.data?.config?.listElement) {
              const newTemplate = new Template('', 0);
              this.createTemplateService.listElement = res?.data?.config?.listElement.map((ele: any) => {
                return newTemplate.clone().convertType(ele);
              });
              this.createTemplateService.load_list_element.next(this.createTemplateService.listElement);
            }
          }
        })
      } else {
        // this.createTemplateService.getData('tpl_chk8f4223aks7397umrg').subscribe((res: any) => {
        //   if (res?.data?.config) {
        //     if (res?.data?.config?.background) {
        //       this.createTemplateService.background = res?.data?.config?.background;
        //       this.createTemplateService.active_template.next(null);
        //     }
        //     if (res?.data?.config?.listElement) {
        //       const newTemplate = new Template('', 0);
        //       this.createTemplateService.listElement = res?.data?.config?.listElement.map((ele: any) => {
        //         return newTemplate.clone().convertType(ele);
        //       });
        //       this.createTemplateService.load_list_element.next(this.createTemplateService.listElement);
        //     }
        //   }
        // })
      }
    })
  }

}
