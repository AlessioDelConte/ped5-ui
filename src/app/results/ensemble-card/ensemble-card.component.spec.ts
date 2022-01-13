import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsembleCardComponent } from './ensemble-card.component';

describe('EnsembleCardComponent', () => {
  let component: EnsembleCardComponent;
  let fixture: ComponentFixture<EnsembleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsembleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsembleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
