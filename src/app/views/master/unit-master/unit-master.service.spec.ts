import { TestBed } from '@angular/core/testing';

import { UnitMasterService } from './unit-master.service';

describe('UnitMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitMasterService = TestBed.get(UnitMasterService);
    expect(service).toBeTruthy();
  });
});
