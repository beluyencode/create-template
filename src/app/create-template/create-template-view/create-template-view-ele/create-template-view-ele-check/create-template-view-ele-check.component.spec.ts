import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateViewEleCheckComponent } from './create-template-view-ele-check.component';

describe('CreateTemplateViewEleCheckComponent', () => {
  let component: CreateTemplateViewEleCheckComponent;
  let fixture: ComponentFixture<CreateTemplateViewEleCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTemplateViewEleCheckComponent]
    });
    fixture = TestBed.createComponent(CreateTemplateViewEleCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
