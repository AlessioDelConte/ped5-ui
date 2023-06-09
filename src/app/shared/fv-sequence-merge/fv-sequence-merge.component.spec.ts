import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvSequenceMergeComponent } from './fv-sequence-merge.component';

describe('FvSequenceMergeComponent', () => {
  let component: FvSequenceMergeComponent;
  let fixture: ComponentFixture<FvSequenceMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FvSequenceMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FvSequenceMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
