import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundTemplate, Template, TemplateGroup, TypeAction, TypeTemplate, apiUrl, checkInState } from './create-template';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CreateTemplateService {
  //data
  background: BackgroundTemplate = new BackgroundTemplate();
  listElement: (Template | TemplateGroup)[] = [];
  listValueDynamic: any[] = [];
  listQrValueDynamic: any[] = []
  scaleDefault = 854;
  currentWidth = 0;
  currentHeight = 0;
  isTemplateEvent: any = null;
  edit;
  listLinkTemplate: string[] = [];
  //event
  load_list_element;
  fullScreen;
  active_template;
  mouse_over_view;
  save_to_img;
  changeScaleScreen;
  save_config;
  idTemplate;
  loading;

  constructor(
    private http: HttpClient
  ) {
    this.fullScreen = new BehaviorSubject<any>(false);
    this.active_template = new BehaviorSubject<any>(null);
    this.mouse_over_view = new BehaviorSubject<any>(false);
    this.save_to_img = new BehaviorSubject<any>(false);
    this.changeScaleScreen = new BehaviorSubject<any>(null);
    this.save_config = new BehaviorSubject<any>(null);
    this.idTemplate = new BehaviorSubject<any>('');
    this.loading = new BehaviorSubject<any>(false);
    this.edit = new BehaviorSubject<any>(true);
    // this.listElement = [...Array(1)].map((ele: any, index: number) => {
    //   return new Template('element ' + index, 12 + index);
    // });
    this.load_list_element = new BehaviorSubject<any>(this.listElement);
  }

  ObjectId(m = Math, d = Date, h = 16, s = (sELe: any) => m.floor(sELe).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  }

  listen_full_screen() {
    return this.fullScreen.asObservable();
  }

  listen_active_template() {
    return this.active_template.asObservable();
  }

  listen_change_list_element() {
    return this.load_list_element.asObservable();
  }

  listen_save_to_img() {
    return this.save_to_img.asObservable();
  }

  listen_change_scale_screen() {
    return this.changeScaleScreen.asObservable();
  }

  listen_save_config() {
    return this.save_config.asObservable();
  }

  listen_id_template() {
    return this.idTemplate.asObservable();
  }

  changeStateCheckIn(state: string) {
    this.listElement.forEach((item: Template | TemplateGroup) => {
      if (item instanceof Template) {
        if (item.type === TypeTemplate.CHECK_IN) {
          item.checkInOptions.activeType = state as checkInState
        }
      } else {
        item.data.forEach((item2: Template) => {
          item2.checkInOptions.activeType = state as checkInState
        })
      }
    })
  }

  changeTemplate(action: TypeAction, template: Template | BackgroundTemplate | TemplateGroup) {
    if (template instanceof Template || template instanceof TemplateGroup) {
      switch (action) {
        case TypeAction.COPY:
          if (template instanceof Template) {
            let clone = template.clone();
            clone.id = this.ObjectId();
            if (template.idGroup) {
              const index = this.listElement.findIndex((ele) => ele.id === template.idGroup);
              clone.name = 'element ' + ((this.listElement[index] as TemplateGroup).data.length + 1) + ` (${(this.listElement[index] as TemplateGroup).name})`;
              clone.content = 'element ' + ((this.listElement[index] as TemplateGroup).data.length + 1) + ` (${(this.listElement[index] as TemplateGroup).name})`;
              clone.idGroup = template.idGroup;
              (this.listElement[index] as TemplateGroup).data.push(clone);
              console.log(clone.id, template.id);

            } else {
              clone.name = 'element ' + (this.listElement.length + 1);
              clone.content = 'element ' + (this.listElement.length + 1);
              this.listElement.push(clone);
            }
          }
          if (template instanceof TemplateGroup) {
            let clone = template.clone();
            clone.id = this.ObjectId();
            clone.name = 'group ' + (this.listElement.length + 1);
            clone.data = clone.data.map((ele: Template) => {
              const newELe = new Template('', 1, clone.id);
              return newELe.clone().convertType({
                ...ele,
                id: this.ObjectId(),
                idGroup: clone.id,
                name: ele.name.replace(template.name, clone.name)
              });
            });
            this.listElement.push(clone);
          }
          this.load_list_element.next(this.listElement);
          break;
        case TypeAction.CHANGE:
          this.listElement = this.listElement.map((ele: Template | TemplateGroup) => {
            if (ele.id === template.id) {
              return template
            }
            return ele;
          });
          break;
        case TypeAction.DELETE:
          if (template instanceof Template) {
            if (template.idGroup) {
              const findELe = (this.listElement.find((ele: any) => ele.id === template.idGroup) as TemplateGroup);
              findELe.data = findELe.data.filter((ele: Template) => ele.id !== template.id);
            }
            this.listElement = this.listElement.filter((ele: Template | TemplateGroup) => ele.id !== template.id);
          } else {
            this.listElement = this.listElement.filter((ele) => ele.id !== template.id);
          }
          this.load_list_element.next(this.listElement);
          this.active_template.next(null);
          break;
        default:
          break;
      }
    } else {
      if (template) {
        this.background = template
      }
    }
  }

  addGroup() {
    const newELe = new TemplateGroup('group ' + (this.listElement.filter((ele) => ele instanceof TemplateGroup).length + 1));
    this.listElement.push(newELe);
    return newELe.id;
  }

  addTemplate() {
    this.listElement = [
      ...this.listElement,
      new Template('element ' + ((this.listElement.filter((ele) => ele instanceof Template).length + 1)), 10),
    ];
    this.load_list_element.next(this.listElement);
  }

  saveConfig(body: any, id: string) {
    return this.http.post(apiUrl.origin + apiUrl.update, body, {
      params: {
        id: id
      }
    })
  }

  saveConfigEvent(body: any) {
    return this.http.post(apiUrl.origin + apiUrl.updateEvent, body, {
      params: {
        id: this.isTemplateEvent._id
      }
    })
  }

  uploadImg(body: any) {
    return this.http.post(apiUrl.origin + apiUrl.uploadImg, body)
  }

  getData(id: string) {
    return this.http.get(apiUrl.origin + apiUrl.get, {
      params: {
        id: id
      }
    })
  }
  getTemplateSample() {
    return this.http.get('assets/json/template_check_in.json')
  }
}
