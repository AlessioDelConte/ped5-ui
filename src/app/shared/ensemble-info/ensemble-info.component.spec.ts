import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsembleInfoComponent } from './ensemble-info.component';

describe('EnsembleInfoComponent', () => {
  let component: EnsembleInfoComponent;
  let fixture: ComponentFixture<EnsembleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsembleInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsembleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
