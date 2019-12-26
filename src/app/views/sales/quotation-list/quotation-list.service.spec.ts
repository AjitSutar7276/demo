import { TestBed } from '@angular/core/testing';

import { QuotationListService } from './quotation-list.service';

describe('QuotationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationListService = TestBed.get(QuotationListService);
    expect(service).toBeTruthy();
  });
});
