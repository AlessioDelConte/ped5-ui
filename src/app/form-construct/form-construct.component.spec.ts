import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConstructComponent } from './form-construct.component';

describe('FormConstructComponent', () => {
  let component: FormConstructComponent;
  let fixture: ComponentFixture<FormConstructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConstructComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
