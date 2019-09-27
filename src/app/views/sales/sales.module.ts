import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { PartyMasterComponent } from './party-master/party-master.component';
import { QuotationMasterComponent } from './quotation-master/quotation-master.component';


@NgModule({
  declarations: [PartyMasterComponent, QuotationMasterComponent],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
