import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobWorkComponent } from './job-work/job-work.component';


const routes: Routes = [{
  path: '',
    data: {
      title: 'Production'
    },
    children: [
      {
        path: '',
        redirectTo: 'JobWork'
      },
      {
        path: 'JobWork',
        component: JobWorkComponent,
        data: {
          title: 'Job Work'
        }
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
