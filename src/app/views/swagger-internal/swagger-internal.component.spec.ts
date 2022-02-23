import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaggerInternalComponent } from './swagger-internal.component';

describe('SwaggerInternalComponent', () => {
  let component: SwaggerInternalComponent;
  let fixture: ComponentFixture<SwaggerInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwaggerInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaggerInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
