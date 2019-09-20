import { TestBed } from '@angular/core/testing';

import { SurfaceTreMasterService } from './surface-tre-master.service';

describe('SurfaceTreMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurfaceTreMasterService = TestBed.get(SurfaceTreMasterService);
    expect(service).toBeTruthy();
  });
});
