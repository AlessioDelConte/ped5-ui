import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsBrowseComponent } from './jobs-browse.component';

describe('JobsBrowseComponent', () => {
  let component: JobsBrowseComponent;
  let fixture: ComponentFixture<JobsBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
