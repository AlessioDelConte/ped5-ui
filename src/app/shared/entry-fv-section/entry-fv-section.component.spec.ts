import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFvSectionComponent } from './entry-fv-section.component';

describe('EntryFvSectionComponent', () => {
  let component: EntryFvSectionComponent;
  let fixture: ComponentFixture<EntryFvSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryFvSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFvSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
