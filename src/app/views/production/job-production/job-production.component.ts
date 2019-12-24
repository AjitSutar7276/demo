import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { ServicesService } from '../../services/services.service';
import {ChangeDetectorRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobProductionService } from './job-production.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-job-production',
  templateUrl: './job-production.component.html',
  styleUrls: ['./job-production.component.scss']
})
export class JobProductionComponent implements OnInit {

  processBol  : boolean = true;
  processData : any;
  actualworkTime : any;
  ActualTime : any;
  EmpData    : any;
  JobWorkArray = [];
  JobWorktime : any;

  JobArray  = [];
  config = {
    displayKey:"process_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Process Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

  config1 = {
    displayKey:"emp_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Employee Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

  jobProductionForm = new FormGroup({
    id         : new FormControl(''),
    STime      : new FormControl(''),
    Lunchtime  : new FormControl(''),
    EndTime    : new FormControl(''),
    Date       : new FormControl(''),
    LunTime    : new FormControl(''),
    Employeeid : new FormControl(''),
    process    : new FormControl('')
  });
  constructor(private jobService : JobProductionService,private toastr: ToastrService) { 
    this.jobService.getProcessData().subscribe(data=>{
      console.log(data);
      this.processData = data;
    },err=>{
      console.log(err);
    })

    //employee Data
    this.jobService.getEmployeeData().subscribe(data=>{
      this.EmpData = data;
    },err=>{
      console.log(err);
    })
  }

  ngOnInit() {
    this.jobService.getProcessData().subscribe(data=>{
      console.log(data);
      this.processData = data;
    },err=>{
      console.log(err);
    })

    //employee Data
    this.jobService.getEmployeeData().subscribe(data=>{
      this.EmpData = data;
    },err=>{
      console.log(err);
    })
  }

  //Date get
  GetData(event)
  {
    // alert(event.target.value);
    this.processBol = false;
  }

  //Calculate Total Time
  CheckData(ele)
  {
      // debugger
      let StartTime = this.jobProductionForm.controls.STime.value;
      let EndTime   = this.jobProductionForm.controls.EndTime.value;
      let lunchTime = this.jobProductionForm.controls.LunTime.value;

      let date      = this.jobProductionForm.controls.Date.value;
      console.log(ele.value.id);
      let SendData = {
        'date' : date,
        'processid' : ele.value.id
      }

      console.log(SendData);

      this.jobService.getJobPendingData(SendData).subscribe(data=>{
        console.log(data);

        data.forEach(ele => {
          console.log(ele);
          let details ={
            'JobName'      : ele.job_name,
            'job_no'       : ele.job_no,
            'po_id'        : ele.po_id,
            'Size'         : ele.sizeandDescription,
            'Qty'          : ele.qty,
            'deliveryDate' : ele.delivery_date,
            'processName'  : ele.process_name,
            'processid'    : ele.process_id,
            'time'         : ele.time,
            'orderDate'    : ele.po_date,
            'art_no'       : ele.art_no,
            'qty'          : 0,
            'hours'        : 0
           }
          this.JobArray.push(details);
        });
      },err=>{
        console.log(err);
      })

      this.diffTime(StartTime,EndTime);
      var start = this.actualworkTime;
      var end = lunchTime;
  
      let s = start.split(':');
      let e = end.split(':');
  
      let min = s[1]-e[1];
      let hour_carry = 0;
      if(min < 0){
          min += 60;
          hour_carry += 1;
      }
      let hour = s[0]-e[0]-hour_carry;
      let diff = hour + ":" + min;
      this.ActualTime = diff;
      // alert(diff);
      
  }

  pad(num) {
    return ("0"+num).slice(-2);
  }
  diffTime(start,end) {
    var s = start.split(":"), sMin = +s[1] + s[0]*60,
        e =   end.split(":"), eMin = +e[1] + e[0]*60,
     diff = eMin-sMin;
    if (diff<0) { sMin-=12*60;  diff = eMin-sMin }
    var h = Math.floor(diff / 60),
        m = diff % 60;
    // return "" + pad(h) + ":" + pad(m);
    this.actualworkTime = this.pad(h) +':'+this.pad(m);
  }


  editDomain(domain: any){
   
    domain.editable = !domain.editable;
    console.log(this.JobArray);
  }

  assignData(data)
  {
     if(data.qty == '0' && data.hours==0)
     {
       alert('Please Assign Qty and Time');
     }
     else
     {
       this.JobWorkArray.push(data);

     }
  }


  ///Submit Data 
  submitData()
  {
    // alert('data is woring');
    let data = this.jobProductionForm.value;
    if(this.JobWorkArray.length == 0)
    {
      alert('Please Assign Job To Employee');
    }
    else
    {
      data['JobWorkDetails'] =this.JobWorkArray;
      console.log(data);
      this.jobService.SubmitData(data).subscribe(data=>{
        // alert('Data Save Successfully');
        this.toastr.success('Job Work Assign to Employee Successfully', '');
        this.jobProductionForm.reset();
        this.JobArray = [];
        this.JobWorkArray = [];
        this.ngOnInit();
      },err=>{
        console.log(err);
      })
      
    }

  }
}
