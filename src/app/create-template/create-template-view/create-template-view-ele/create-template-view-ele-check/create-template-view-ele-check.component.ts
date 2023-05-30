import { Component, Input, OnInit } from '@angular/core';
import { Template, TypeTemplate, checkInState } from 'src/app/create-template/create-template';

@Component({
  selector: 'app-create-template-view-ele-check',
  templateUrl: './create-template-view-ele-check.component.html',
  styleUrls: ['./create-template-view-ele-check.component.scss']
})
export class CreateTemplateViewEleCheckComponent implements OnInit {
  @Input() data: Template;
  @Input() scale: number;
  @Input() typeCheckIn: checkInState;
  typeTemplate = TypeTemplate;
  checkInState = Object.values(checkInState);

  constructor() { }

  ngOnInit(): void {
  }

}
