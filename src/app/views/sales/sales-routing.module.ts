import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartyMasterComponent  } from './party-master/party-master.component';
import { QuotationMasterComponent} from './quotation-master/quotation-master.component';
import { OrderBookComponent} from './order-book/order-book.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component'; 
import { QuotationReportComponent } from './quotation-report/quotation-report.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales'
    },
    children: [
      {
        path: '',
        redirectTo: 'Party'
      },
      {
        path: 'party',
        component: PartyMasterComponent,
        data: {
          title: 'Party Master'
        }
      },
      {
        path: 'quotation',
        component: QuotationMasterComponent,
        data: {
          title: 'Quotation Master'
        }
      },
      {
        path: 'quotation_list',
        component: QuotationListComponent,
        data: {
          title: 'Quotation List'
        }
      },
      {
        path: 'quotation_report/:id',
        component: QuotationReportComponent,
        data: {
          title: 'Quotation Report'
        }
      },
      {
        path: 'order',
        component: OrderBookComponent,
        data: {
          title: 'Order Book'
        }
      }
    
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
