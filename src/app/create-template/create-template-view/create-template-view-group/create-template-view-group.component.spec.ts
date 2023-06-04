import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateViewGroupComponent } from './create-template-view-group.component';

describe('CreateTemplateViewGroupComponent', () => {
  let component: CreateTemplateViewGroupComponent;
  let fixture: ComponentFixture<CreateTemplateViewGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTemplateViewGroupComponent]
    });
    fixture = TestBed.createComponent(CreateTemplateViewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
