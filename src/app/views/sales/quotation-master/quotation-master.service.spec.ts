import { TestBed } from '@angular/core/testing';

import { QuotationMasterService } from './quotation-master.service';

describe('QuotationMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationMasterService = TestBed.get(QuotationMasterService);
    expect(service).toBeTruthy();
  });
});
