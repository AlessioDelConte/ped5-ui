import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDsspSectionComponent } from './entry-dssp-section.component';

describe('EntryDsspSectionComponent', () => {
  let component: EntryDsspSectionComponent;
  let fixture: ComponentFixture<EntryDsspSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryDsspSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryDsspSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
