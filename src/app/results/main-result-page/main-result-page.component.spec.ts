import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainResultPageComponent } from './main-result-page.component';

describe('MainResultPageComponent', () => {
  let component: MainResultPageComponent;
  let fixture: ComponentFixture<MainResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainResultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
