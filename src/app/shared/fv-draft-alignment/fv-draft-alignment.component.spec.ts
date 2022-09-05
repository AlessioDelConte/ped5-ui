import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvDraftAlignmentComponent } from './fv-draft-alignment.component';

describe('FvDraftAlignmentComponent', () => {
  let component: FvDraftAlignmentComponent;
  let fixture: ComponentFixture<FvDraftAlignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FvDraftAlignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FvDraftAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
