import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { PartyMasterComponent } from './party-master/party-master.component';
import { QuotationMasterComponent } from './quotation-master/quotation-master.component';
import { OrderBookComponent } from './order-book/order-book.component';



@NgModule({
  declarations: [PartyMasterComponent, QuotationMasterComponent, OrderBookComponent],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
