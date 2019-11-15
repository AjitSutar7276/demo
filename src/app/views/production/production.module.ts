import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { JobWorkComponent } from './job-work/job-work.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JobWorkComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SelectDropDownModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductionModule { }
