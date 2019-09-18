import { TestBed } from '@angular/core/testing';

import { JobProcessMasterService } from './job-process-master.service';

describe('JobProcessMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobProcessMasterService = TestBed.get(JobProcessMasterService);
    expect(service).toBeTruthy();
  });
});
