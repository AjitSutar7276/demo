import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { JobWorkComponent } from './job-work/job-work.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  declarations: [JobWorkComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SelectDropDownModule
  ]
})
export class ProductionModule { }
