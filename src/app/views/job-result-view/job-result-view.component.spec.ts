import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResultViewComponent } from './job-result-view.component';

describe('JobResultViewComponent', () => {
  let component: JobResultViewComponent;
  let fixture: ComponentFixture<JobResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobResultViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
