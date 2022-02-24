import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftResultViewComponent } from './draft-result-view.component';

describe('DraftResultViewComponent', () => {
  let component: DraftResultViewComponent;
  let fixture: ComponentFixture<DraftResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftResultViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
