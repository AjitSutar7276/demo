import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesRoutingModule } from './sales-routing.module';
import { PartyMasterComponent } from './party-master/party-master.component';
import { QuotationMasterComponent } from './quotation-master/quotation-master.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationReportComponent } from './quotation-report/quotation-report.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { ExportAsModule } from 'ngx-export-as';



@NgModule({
  declarations: [PartyMasterComponent, QuotationMasterComponent, OrderBookComponent, QuotationListComponent, QuotationReportComponent, OrderListComponent, OrderReportComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SelectDropDownModule,
    ExportAsModule
  ]
})
export class SalesModule { }
