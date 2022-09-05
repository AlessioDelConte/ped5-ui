import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryConstructSectionComponent } from './entry-construct-section.component';

describe('EntryConstructSectionComponent', () => {
  let component: EntryConstructSectionComponent;
  let fixture: ComponentFixture<EntryConstructSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryConstructSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryConstructSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
