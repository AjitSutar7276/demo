import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PartyMasterComponent  } from './party-master/party-master.component';
import {QuotationMasterComponent} from './quotation-master/quotation-master.component';

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
      }
    
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
