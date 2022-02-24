import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsBrowseComponent } from './drafts-browse.component';

describe('DraftsBrowseComponent', () => {
  let component: DraftsBrowseComponent;
  let fixture: ComponentFixture<DraftsBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftsBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftsBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
