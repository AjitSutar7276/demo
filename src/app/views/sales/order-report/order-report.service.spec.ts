import { TestBed } from '@angular/core/testing';

import { OrderReportService } from './order-report.service';

describe('OrderReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderReportService = TestBed.get(OrderReportService);
    expect(service).toBeTruthy();
  });
});
