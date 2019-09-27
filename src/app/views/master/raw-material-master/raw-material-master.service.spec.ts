import { TestBed } from '@angular/core/testing';

import { RawMaterialMasterService } from './raw-material-master.service';

describe('RawMaterialMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RawMaterialMasterService = TestBed.get(RawMaterialMasterService);
    expect(service).toBeTruthy();
  });
});
