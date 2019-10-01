import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobMasterService} from './job-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.scss']
})
export class JobMasterComponent implements OnInit {

  autoId : any;
  jobArray = [];
  updateShow : boolean = false;
  submitShow : boolean = true;

  jobForm = new FormGroup({
    id          : new FormControl(''),
    ArtNo       : new FormControl(''),
    JobName     : new FormControl(''),
    HSN         : new FormControl(''),
    description : new FormControl(''),
    openStock   : new FormControl(''),
    MinStock    : new FormControl(''),
    MaxStock    : new FormControl(''),
    Rate        : new FormControl(''),
    cgst        : new FormControl(''),
    sgst        : new FormControl(''),
    igst        : new FormControl('')

  })
  constructor(private jobservice : JobMasterService,private toastr: ToastrService) 
  {
      //auto Increment id
      this.jobservice.getJobMasterData().subscribe(data=>{
          this.jobArray = data;
          this.autoId = this.jobArray.length;
          this.autoId = this.autoId + 1;
          this.jobForm.controls.id.setValue(this.autoId);
      },err=>{
          console.log('Something is bad');
      })
  }
  get id(){return this.jobForm.get('id');}
  get ArtNo(){return this.jobForm.get('ArtNo');}
  get JobName(){return this.jobForm.get('JobName');}
  get HSN(){return this.jobForm.get('HSN');}
  get description(){return this.jobForm.get('description');}
  get openStock() {return this.jobForm.get('openStock');}
  get MinStock() {return this.jobForm.get('MinStock');}
  get MaxStock(){return this.jobForm.get('MaxStock');}
  get Rate(){return this.jobForm.get('Rate');}
  get cgst(){return this.jobForm.get('cgst');}
  get sgst(){return this.jobForm.get('sgst');}
  get igst(){return this.jobForm.get('igst');}
  ngOnInit() {
    this.jobservice.getJobMasterData().subscribe(data=>{
          this.jobArray = data;
          this.autoId = this.jobArray.length;
          this.autoId = this.autoId + 1;
          this.jobForm.controls.id.setValue(this.autoId);
      },err=>{
          console.log('Something is bad');
      })
  }

  //submit Data
  submitData()
  {
    console.log(this.jobForm.value);
    let data = this.jobForm.value;
    this.jobservice.submitData(data).subscribe(data=>{
        // console.log(data);
        this.jobForm.reset();
        this.ngOnInit();
        this.toastr.success('Job Saved Successfully', 'Job Master');
    },err=>{
        console.log('Something is bad');
        this.toastr.success('Job Not Saved. Something is Wrong.', 'Job Master');
    })
  }

  //update Data
  updateData()
  {
    let data = this.jobForm.value;
    this.jobservice.updateJobData(data).subscribe(data=>{
      this.submitShow = true;
      this.updateShow = false;
      this.jobForm.reset();
      this.ngOnInit();
      this.toastr.success('Job Updated Successfully', 'Job Master');
    },err=>{
      console.log('Something is bad');
      this.toastr.success('Job Not Updated. Something is Wrong.', 'Job Master');
    })
  }
   //Edit data
   editUnit(ele)
   { 
       this.jobservice.update(ele).subscribe(data=>{
          //  console.log(data);
           this.jobForm.controls.id.setValue(data[0].id);
           this.jobForm.controls.ArtNo.setValue(data[0].art_no);
           this.jobForm.controls.JobName.setValue(data[0].job_name);
           this.jobForm.controls.HSN.setValue(data[0].hsn);
           this.jobForm.controls.description.setValue(data[0].description);
           this.jobForm.controls.openStock.setValue(data[0].open_stock);
           this.jobForm.controls.MinStock.setValue(data[0].min_stock);
           this.jobForm.controls.MaxStock.setValue(data[0].max_stock);
           this.jobForm.controls.Rate.setValue(data[0].rate);
           this.jobForm.controls.cgst.setValue(data[0].cgst);
           this.jobForm.controls.sgst.setValue(data[0].sgst);
           this.jobForm.controls.igst.setValue(data[0].igst);
           this.updateShow = true;
           this.submitShow = false;
       })
   }
 
   //delete data
   deleteUnit(eles)
   {
       this.jobservice.deleteJob(eles).subscribe(data=>{
           console.log(data);
           this.ngOnInit();
           this.toastr.success('Job Deleted Successfully', 'Job Master');
       },err=>{
           console.log('Not Delete Record');
           this.toastr.success('Job Not Deleted. Something is Wrong.', 'Job Master');
       })
   }
}
