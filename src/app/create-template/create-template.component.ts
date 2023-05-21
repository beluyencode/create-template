import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { TypeScreen } from './create-template';
import { CreateTemplateService } from './create-template.service';
import { ActivatedRoute } from '@angular/router';

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
    this.createTemplateService.idTemplate.next(event.data);
  }

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_id_template().subscribe((res: string) => {
      if (res !== '' && typeof res === 'string') {
        this.createTemplateService.getData(res).subscribe((res: any) => {
          if (res?.data?.config) {
            if (res?.data?.config?.background) {
              this.createTemplateService.background = res?.data?.config?.background;
              this.createTemplateService.active_template.next(null);
            }
            if (res?.data?.config?.listElement) {
              this.createTemplateService.listElement = res?.data?.config?.listElement;
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
        //       this.createTemplateService.listElement = res?.data?.config?.listElement;
        //       this.createTemplateService.load_list_element.next(this.createTemplateService.listElement);
        //     }
        //   }
        // })
      }
    })
  }

}
