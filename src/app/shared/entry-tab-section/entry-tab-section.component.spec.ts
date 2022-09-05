import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTabSectionComponent } from './entry-tab-section.component';

describe('EntryTabSectionComponent', () => {
  let component: EntryTabSectionComponent;
  let fixture: ComponentFixture<EntryTabSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryTabSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryTabSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
