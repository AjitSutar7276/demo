import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobProcessMasterService} from './job-process-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-process-master',
  templateUrl: './job-process-master.component.html',
  styleUrls: ['./job-process-master.component.scss']
})
export class JobProcessMasterComponent implements OnInit {
  jobArray = [];
  autoId : any;
  updateShow : boolean = false;
  submitShow : boolean = true;
  jobProcess = new FormGroup({
    process_name : new FormControl(''),
    id           : new FormControl(''),
    process_place: new FormControl('')
  })
  constructor(private jobService : JobProcessMasterService,private toastr: ToastrService) {
    //auto Increment id
    this.jobService.getJobProccessMasterData().subscribe(data =>{
      this.jobArray = data;
      this.autoId = this.jobArray.length;
      this.autoId = this.autoId + 1;
      this.jobProcess.controls.id.setValue(this.autoId);
    });
   }

   get process_name(){return this.jobProcess.get('process_name');}
   get process_place(){return this.jobProcess.get('process_place');}
  ngOnInit() {
    this.jobService.getJobProccessMasterData().subscribe(data =>{
      this.jobArray = data;
      this.autoId = this.jobArray.length;
      this.autoId = this.autoId + 1;
      this.jobProcess.controls.id.setValue(this.autoId);
    });
  }

  //submit data
  submitData()
  {
    let data = this.jobProcess.value;
    this.jobService.submitData(data).subscribe(data=>{
      console.log(data);
      this.jobProcess.reset();
      this.ngOnInit();
      this.toastr.success('Job Process Saved Successfully', 'Job Process Master');
    },err=>{
      console.log('Something is Bad');
      this.toastr.success('Job Process Not Saved. Something is Wrong.', 'Job Process Master');
    })
  }
  updateData()
  {
    let data = this.jobProcess.value;
    this.jobService.updateData(data).subscribe(data=>{
      this.jobProcess.reset();
      this.ngOnInit();
      this.updateShow = false;
      this.submitShow = true;
      this.toastr.success('Job Process Updated Successfully', 'Job Process Master');
    },err=>{
      console.log('Something is bad');
      this.toastr.success('Job Process Not Updated. Something is Wrong.', 'Job Process Master');
    })
  }
  //Edit data
  editUnit(ele)
  { 
      this.jobService.update(ele).subscribe(data=>{
          console.log(data);
          this.jobProcess.controls.id.setValue(data[0].id);
          this.jobProcess.controls.process_name.setValue(data[0].process_name);
          this.jobProcess.controls.process_place.setValue(data[0].process_place);
          this.updateShow = true;
          this.submitShow = false;
      })
  }

  //delete data
  deleteUnit(eles)
  {
      this.jobService.deleteJob(eles).subscribe(data=>{
          console.log(data);
          this.ngOnInit();
          this.toastr.success('Job Process Deleted Successfully', 'Job Process Master');
      },err=>{
          console.log('Not Delete Record');
          this.toastr.success('Job Process Not Saved. Something is Wrong.', 'Job Process Master');
      })
  }
}
