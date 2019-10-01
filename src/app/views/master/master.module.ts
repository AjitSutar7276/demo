import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MasterRoutingModule } from './master-routing.module';
import { UnitMasterComponent } from './unit-master/unit-master.component';
import { ShadeMasterComponent } from './shade-master/shade-master.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { JobProcessMasterComponent } from './job-process-master/job-process-master.component';
import { SurfaceTreMasterComponent } from './surface-tre-master/surface-tre-master.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { RawMaterialMasterComponent } from './raw-material-master/raw-material-master.component';
import { MachineMasterComponent } from './machine-master/machine-master.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 

@NgModule({
  declarations: [FileSelectDirective,UnitMasterComponent, ShadeMasterComponent, JobMasterComponent, JobProcessMasterComponent, SurfaceTreMasterComponent, RawMaterialMasterComponent, MachineMasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    HttpModule
    
  ]
})
export class MasterModule { }
