import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryEnsemblesSectionComponent } from './entry-ensembles-section.component';

describe('EntryEnsemblesSectionComponent', () => {
  let component: EntryEnsemblesSectionComponent;
  let fixture: ComponentFixture<EntryEnsemblesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryEnsemblesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryEnsemblesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
