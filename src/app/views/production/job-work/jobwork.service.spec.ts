import { TestBed } from '@angular/core/testing';

import { JobworkService } from './jobwork.service';

describe('JobworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobworkService = TestBed.get(JobworkService);
    expect(service).toBeTruthy();
  });
});
