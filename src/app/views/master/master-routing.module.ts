import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnitMasterComponent} from './unit-master/unit-master.component'

const routes: Routes = [{
  path: '',
    data: {
      title: 'Master'
    },
    children: [
      {
        path: '',
        redirectTo: 'unit'
      },
      {
        path: 'unit',
        component: UnitMasterComponent,
        data: {
          title: 'Unit Master'
        }
      },
     
    ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
