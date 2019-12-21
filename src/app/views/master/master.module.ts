import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MasterRoutingModule } from './master-routing.module';
import { UnitMasterComponent } from './unit-master/unit-master.component';
import { ShadeMasterComponent } from './shade-master/shade-master.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { JobProcessMasterComponent } from './job-process-master/job-process-master.component';
import { SurfaceTreMasterComponent } from './surface-tre-master/surface-tre-master.component';
// import { FileSelectDirective, FileDropDirective, FileUploader  } from 'ng2-file-upload';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';

import { ReactiveFormsModule } from '@angular/forms';
import { RawMaterialMasterComponent } from './raw-material-master/raw-material-master.component';
import { MachineMasterComponent } from './machine-master/machine-master.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { ShiftMasterComponent } from './shift-master/shift-master.component';
// FileSelectDirective,
@NgModule({
  declarations: [UnitMasterComponent, ShadeMasterComponent, JobMasterComponent, JobProcessMasterComponent, SurfaceTreMasterComponent, RawMaterialMasterComponent, MachineMasterComponent, EmployeeMasterComponent, ShiftMasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    SelectDropDownModule,
    NgxDatatableModule,
    FileUploadModule
    
  ]
})
export class MasterModule { }
