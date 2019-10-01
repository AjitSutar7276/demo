import { TestBed } from '@angular/core/testing';

import { PartyMasterService } from './party-master.service';

describe('PartyMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyMasterService = TestBed.get(PartyMasterService);
    expect(service).toBeTruthy();
  });
});
