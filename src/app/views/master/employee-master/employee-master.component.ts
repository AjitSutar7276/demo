import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { EmployeeMasterService } from './employee-master.service';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.scss']
})
export class EmployeeMasterComponent implements OnInit {


  rows = [];
  SubmitShow : boolean = true;
  updateShow : boolean = false;
  //FormGroup object
  EmployeeForm = new FormGroup({
    eName    : new FormControl(''),
    eCode    : new FormControl(''),
    desig    : new FormControl(''),
    mNo      : new FormControl(''),
    address  : new FormControl(''),
    joinDate : new FormControl(''),
    eSal     : new FormControl(''),
    id       : new FormControl('') 
  });
  constructor(private toastr: ToastrService,private EmpService : EmployeeMasterService) {
      //Get Employee Data
      this.EmpService.getEmployeeData().subscribe(data=>{
        console.log(data);
        this.rows = data;
      },err=>{  
        console.log(err);
      })

   }

  ngOnInit() {

     //Get Employee Data
     this.EmpService.getEmployeeData().subscribe(data=>{
      console.log(data);
      this.rows = data;
    },err=>{  
      console.log(err);
    })
  }


  //Submit Employee Data
  submitData()
  {
    console.log(this.EmployeeForm.value);
    let data = this.EmployeeForm.value;
    this.EmpService.insertEmployee(data).subscribe(ele=>{
        console.log(ele);
        this.EmployeeForm.reset();
        this.ngOnInit();
        this.toastr.success('Employee Add Successfully', 'Employee Master');
    },err=>{
      console.log(err);
      this.toastr.success('Employee Not Saved. Something is Wrong.', 'Employee Master');

    })
  }

  //Upload Employee Data
  UpdateData()
  {
    let data = this.EmployeeForm.value;
    console.log(data);
    this.EmpService.updateEmployee(data).subscribe(ele=>{
      this.EmployeeForm.reset();
      this.ngOnInit();
      this.toastr.success('Employee Add Successfully', 'Employee Master');

    },err=>{
      this.toastr.success('Employee Not Saved. Something is Wrong.', 'Employee Master');
    })
  }



  //Delete Employee Data
  deleteUnit(ele)
  {
    this.EmpService.deleteEmployeeData(ele).subscribe(ele=>{
      this.ngOnInit();
      this.toastr.success('Employee Delete Successfully','Employee Master');
    },err=>{
      this.toastr.info('Employee Not Saved. Something is Wrong.', 'Employee Master');

    })
  }

  //Edit Employee Data
  editUnit(id)
  {
    this.EmpService.EditEmployeeData(id).subscribe(ele=>{
      console.log(ele);
      this.EmployeeForm.controls.eCode.setValue(ele[0].emp_code);
      this.EmployeeForm.controls.eName.setValue(ele[0].emp_name);
      this.EmployeeForm.controls.desig.setValue(ele[0].designation);
      this.EmployeeForm.controls.address.setValue(ele[0].address);
      this.EmployeeForm.controls.mNo.setValue(ele[0].mobile_no);
      this.EmployeeForm.controls.eSal.setValue(ele[0].salary);
      this.EmployeeForm.controls.joinDate.setValue(ele[0].join_date);
      this.EmployeeForm.controls.id.setValue(ele[0].id);
      this.SubmitShow = false;
      this.updateShow = true;
    },err=>{
      this.toastr.info('Employee Not Saved. Something is Wrong.', 'Employee Master');
    })
  }
}
