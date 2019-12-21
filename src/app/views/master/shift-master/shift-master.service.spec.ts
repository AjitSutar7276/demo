import { TestBed } from '@angular/core/testing';

import { ShiftMasterService } from './shift-master.service';

describe('ShiftMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftMasterService = TestBed.get(ShiftMasterService);
    expect(service).toBeTruthy();
  });
});
