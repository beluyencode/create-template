import { Component, OnInit } from '@angular/core';
import { Template, TemplateGroup, TypeAction, TypeTemplate } from '../create-template';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-list',
  templateUrl: './create-template-list.component.html',
  styleUrls: ['./create-template-list.component.scss']
})
export class CreateTemplateListComponent implements OnInit {
  listTemplate: any[] = [];
  activeTemplate: Template | any;
  typeView = 'xem';
  activeDropdownTemplate: any = [];
  typeTemplate = TypeTemplate;

  constructor(
    public createTemplateService: CreateTemplateService
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_change_list_element().subscribe((res: Template[]) => {
      this.listTemplate = res;
      this.listTemplate.forEach((ele: Template | TemplateGroup) => {
        if (ele instanceof TemplateGroup) {
          this.activeDropdownTemplate.push({
            id: ele.id,
            isOpen: false
          });
        }
      })
    });
    this.createTemplateService.listen_active_template().subscribe((res: Template) => {
      this.activeTemplate = res;
    })
  }

  findGroup(id: string) {
    return this.activeDropdownTemplate.find((ele: Template | TemplateGroup) => ele.id === id);
  }

  fullScreen(event: MouseEvent) {
    event.stopPropagation();
    this.createTemplateService.fullScreen.next(true);
  }

  changeActiveTemplate(event: MouseEvent, template: Template | null) {
    event.stopPropagation();
    if (template) {
      if (template.id !== this.activeTemplate?.id) {
        this.createTemplateService.active_template.next(template);
      }
    } else {
      this.createTemplateService.active_template.next(template);
    }
  }

  copyEle(template: Template) {
    console.log(template);

    this.createTemplateService.changeTemplate(TypeAction.COPY, template)
  }

  hidden(template: Template) {
    if (template.type !== TypeTemplate.CHECK_IN) {
      template.hidden = !template.hidden;
    } else {
      template.checkInOptions[template.checkInOptions.activeType].hidden = !template.checkInOptions[template.checkInOptions.activeType].hidden
    }
  }

  save() {
    console.log(this.createTemplateService.listElement);

    this.createTemplateService.save_config.next(true);
  }

  saveToImg() {
    this.createTemplateService.save_to_img.next(true);
  }

  deleteELe(ele: Template) {
    this.createTemplateService.changeTemplate(TypeAction.DELETE, ele);
  }

  addEle() {
    this.createTemplateService.addTemplate();
  }

  addGroup() {
    this.activeDropdownTemplate.push({
      id: this.createTemplateService.addGroup(),
      isOpen: false
    });
  }

  addEleGroup(group: TemplateGroup) {
    group.data.push(new Template(`ele ${group.data.length + 1} (group ${(this.listTemplate.filter((ele) => ele instanceof TemplateGroup).length)})`, 10, group.id))

  }

  isGroup(ele: Template | TemplateGroup) {
    if (ele instanceof Template) {
      return false;
    }
    return true;
  }

  viewMode() {
    if (this.typeView === 'xem') {
      this.createTemplateService.edit.next(false);
    } else {
      this.createTemplateService.edit.next(true);
    }
    this.typeView = (this.typeView === 'xem') ? 'edit' : 'xem';
    this.createTemplateService.active_template.next(null);
  }

}
