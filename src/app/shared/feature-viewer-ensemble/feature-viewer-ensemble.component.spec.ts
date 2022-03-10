import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureViewerEnsembleComponent } from './feature-viewer-ensemble.component';

describe('FeatureViewerEnsembleComponent', () => {
  let component: FeatureViewerEnsembleComponent;
  let fixture: ComponentFixture<FeatureViewerEnsembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureViewerEnsembleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureViewerEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
