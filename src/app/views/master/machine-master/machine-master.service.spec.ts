import { TestBed } from '@angular/core/testing';

import { MachineMasterService } from './machine-master.service';

describe('MachineMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachineMasterService = TestBed.get(MachineMasterService);
    expect(service).toBeTruthy();
  });
});
