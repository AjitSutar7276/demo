import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationMasterComponent } from './quotation-master.component';

describe('QuotationMasterComponent', () => {
  let component: QuotationMasterComponent;
  let fixture: ComponentFixture<QuotationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
