import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnitMasterComponent} from './unit-master/unit-master.component';
import {ShadeMasterComponent} from './shade-master/shade-master.component';
import {SurfaceTreMasterComponent} from './surface-tre-master/surface-tre-master.component';
import {JobProcessMasterComponent} from './job-process-master/job-process-master.component';
import {JobMasterComponent} from './job-master/job-master.component';
import {RawMaterialMasterComponent} from './raw-material-master/raw-material-master.component';
import {MachineMasterComponent} from './machine-master/machine-master.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { ShiftMasterComponent } from './shift-master/shift-master.component';


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
      {
        path: 'shade',
        component: ShadeMasterComponent,
        data: {
          title: 'Shade Master'
        }
      },

      {
        path: 'surfaceTreMaster',
        component: SurfaceTreMasterComponent,
        data: {
          title: 'Surface Treatment Master'
        }
      },

      {
        path: 'jobProcessMaster',
        component: JobProcessMasterComponent,
        data: {
          title: 'Job Process Master'
        }
      },

      {
        path: 'jobMaster',
        component: JobMasterComponent,
        data: {
          title: 'Job Master'
        }
      },

      {
        path: 'rawMaster',
        component: RawMaterialMasterComponent,
        data: {
          title: 'Raw Master'
        }
      },

      {
        path: 'machineMaster',
        component: MachineMasterComponent,
        data: {
          title: 'Machine Master'
        }
      },

      {
        path: 'employeeMaster',
        component: EmployeeMasterComponent,
        data: {
          title: 'Employee Master'
        }
      },

      {
        path: 'shiftMaster',
        component: ShiftMasterComponent,
        data: {
          title: 'Shift Master'
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
