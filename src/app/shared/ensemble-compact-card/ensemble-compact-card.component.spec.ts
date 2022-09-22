import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsembleCompactCardComponent } from './ensemble-compact-card.component';

describe('EnsembleCompactCardComponent', () => {
  let component: EnsembleCompactCardComponent;
  let fixture: ComponentFixture<EnsembleCompactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsembleCompactCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsembleCompactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
