import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundTemplate, Template, TemplateGroup, TypeAction, TypeTemplate, apiUrl } from './create-template';
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
    this.listElement = [...Array(1)].map((ele: any, index: number) => {
      return new Template('element ' + index, 12 + index);
    });
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

  changeTemplate(action: TypeAction, template: Template | BackgroundTemplate,) {
    if (template instanceof Template || template instanceof TemplateGroup) {
      switch (action) {
        case TypeAction.COPY:
          const clone = template.clone();
          clone.id = this.ObjectId();
          clone.name = 'element ' + (this.listElement.length + 1);
          clone.content = 'element ' + (this.listElement.length + 1);
          this.listElement.push(clone);
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
          this.listElement = this.listElement.filter((ele: Template | TemplateGroup) => ele.id !== template.id);
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
    this.listElement.push(new TemplateGroup('group ' + (this.listElement.filter((ele) => ele instanceof TemplateGroup).length + 1)));
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
}
