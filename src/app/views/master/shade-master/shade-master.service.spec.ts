import { TestBed } from '@angular/core/testing';

import { ShadeMasterService } from './shade-master.service';

describe('ShadeMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShadeMasterService = TestBed.get(ShadeMasterService);
    expect(service).toBeTruthy();
  });
});
