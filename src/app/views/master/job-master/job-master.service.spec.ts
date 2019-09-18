import { TestBed } from '@angular/core/testing';

import { JobMasterService } from './job-master.service';

describe('JobMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobMasterService = TestBed.get(JobMasterService);
    expect(service).toBeTruthy();
  });
});
