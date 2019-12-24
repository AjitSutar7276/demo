import { TestBed } from '@angular/core/testing';

import { JobProductionService } from './job-production.service';

describe('JobProductionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobProductionService = TestBed.get(JobProductionService);
    expect(service).toBeTruthy();
  });
});
