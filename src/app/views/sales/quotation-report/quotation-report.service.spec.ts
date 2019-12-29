import { TestBed } from '@angular/core/testing';

import { QuotationReportService } from './quotation-report.service';

describe('QuotationReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationReportService = TestBed.get(QuotationReportService);
    expect(service).toBeTruthy();
  });
});
