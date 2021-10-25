import { TestBed } from '@angular/core/testing';

import { SubmissionResolver } from './submission.resolver';

describe('SubmissionResolver', () => {
  let resolver: SubmissionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubmissionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
