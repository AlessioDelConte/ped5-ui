import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositionComponent } from './deposition.component';

describe('DepositionComponent', () => {
  let component: DepositionComponent;
  let fixture: ComponentFixture<DepositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
