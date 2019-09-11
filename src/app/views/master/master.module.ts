import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { UnitMasterComponent } from './unit-master/unit-master.component';
import { ShadeMasterComponent } from './shade-master/shade-master.component';


@NgModule({
  declarations: [UnitMasterComponent, ShadeMasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
