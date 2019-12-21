import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ShiftMasterService } from './shift-master.service';

@Component({
  selector: 'app-shift-master',
  templateUrl: './shift-master.component.html',
  styleUrls: ['./shift-master.component.scss']
})
export class ShiftMasterComponent implements OnInit {

  submitShow : boolean = true;
  updateShow : boolean = false;
  rows = [];
  constructor(private shiftservice : ShiftMasterService,private toastr: ToastrService) {

      //Shift Records
      this.shiftservice.getShiftMaster().subscribe(data=>{
        this.rows = data;
      },err=>{
        console.log(err);
      })

   }

  //Form Group 
  shiftMaster = new FormGroup({
    id      : new FormControl(''),
    sftName : new FormControl(''),
    sTime   : new FormControl(''),
    eTime   : new FormControl(''),
    shift   : new FormControl(''),
    gTime   : new FormControl(''),
    tTime   : new FormControl(''),
    awTime  : new FormControl('')

  });


  ngOnInit() {

    this.shiftservice.getShiftMaster().subscribe(data=>{
      this.rows = data;
    },err=>{
      console.log(err);
    })
    
  }


  //Submit Data
  submitData()
  {
    let data = this.shiftMaster.value;
    console.log(data);
    this.shiftservice.insertShiftMaster(data).subscribe(data=>{
      this.toastr.success('Shift Add Successfully', 'Shift Master');
      this.shiftMaster.reset();
      this.ngOnInit();

    },err=>{
      this.toastr.info('Unit Not Updated. Something is Wrong.', 'Shift Master');
    })
  }

  //Delete Data 
  deleteUnit(id)
  {
    this.shiftservice.deleteShift(id).subscribe(data=>{
      this.ngOnInit();
    })
  }

  //Edit Master
  editUnit(id)
  {
     this.shiftservice.editShiftData(id).subscribe(data=>{
       this.shiftMaster.controls.id.setValue(data[0].id);
       this.shiftMaster.controls.sftName.setValue(data[0].shift_name);
       this.shiftMaster.controls.sTime.setValue(data[0].s_time);
       this.shiftMaster.controls.eTime.setValue(data[0].e_time);
       this.shiftMaster.controls.shift.setValue(data[0].nightShift);
       this.shiftMaster.controls.gTime.setValue(data[0].g_time);
       this.shiftMaster.controls.tTime.setValue(data[0].t_time);
       this.shiftMaster.controls.awTime.setValue(data[0].a_time);
       this.submitShow = false;
       this.updateShow = true;

     },err=>{
      this.toastr.error('Unit Not Updated. Something is Wrong.', 'Shift Master');
     })
  }

  //update Master
  UpdateData()
  {
     let data = this.shiftMaster.value;
     this.shiftservice.updateShiftMaster(data).subscribe(data=>{
       this.shiftMaster.reset();
       this.ngOnInit();
       this.toastr.success('Shift Update Successfully', 'Shift Master');


     },err=>{
      this.toastr.error('Unit Not Updated. Something is Wrong.', 'Shift Master');
     })
  }
}
