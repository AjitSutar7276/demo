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
  categoryData :any;
  RawMaterial =[];
  rawData : any;

  divShow : boolean = false;
  unitData : any;
  config1 = {
    displayKey:"category_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Item Type',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

  config = {
    displayKey:"itme_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Item Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

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
    igst        : new FormControl(''),
    Thickness1  : new FormControl(''),
    SalesRate1  : new FormControl(''),
    PurRate1    : new FormControl(''),
    sqFeet1     : new FormControl(''),
    weight1     : new FormControl(''),
    HSN1        : new FormControl(''),
    unit1       : new FormControl(''),
    itmeType1   : new FormControl(''),
    itmeName1   : new FormControl('')

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

      //Get Category Master
      this.jobservice.cotegoryData().subscribe(data=>{
        this.categoryData = data;
      },err=>{
        console.log(err);
      })

      this.jobservice.unitData().subscribe(data=>{
        console.log(data);
        this.unitData = data;
      },err=>{
        console.log(err);
      });

      this.jobservice.getRawMaterialData().subscribe(data=>{
        this.rawData = data;
        console.log('this is array');
        console.log(this.rawData);
      },err=>{
        console.log(err);
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
  get Thickness1(){return this.jobForm.get('Thickness1');}
  get SalesRate1(){return this.jobForm.get('SalesRate1');}
  get PurRate1(){return this.jobForm.get('PurRate1');}
  get sqFeet1(){return this.jobForm.get('sqFeet1');}
  get weight1(){return this.jobForm.get('weight1');}
  get HSN1(){return this.jobForm.get('HSN1');}
  get unit1(){return this.jobForm.get('unit1');}
  get itmeType1(){return this.jobForm.get('itmeType1');}
  get itmeName1(){return this.jobForm.get('itmeName1');}
  ngOnInit() {
    this.jobservice.getJobMasterData().subscribe(data=>
      {
          this.jobArray = data;
          this.autoId = this.jobArray.length;
          this.autoId = this.autoId + 1;
          this.jobForm.controls.id.setValue(this.autoId);
      },err=>
      {
          console.log('Something is bad');
      });

      //this Raw Data
      this.jobservice.getRawMaterialData().subscribe(data=>{
        this.rawData = data;
        console.log('this is array');
        console.log(this.rawData);
      },err=>{
        console.log(err);
      })
  }

  //submit Data
  submitData()
  {
    // console.log(this.jobForm.value);
    let data = this.jobForm.value;
    data['RawDetails'] = this.RawMaterial;
    console.log(data['RawDetails']);
    data['Checked'] = this.divShow;
    console.log(data);
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
       this.jobservice.deleteJob(eles).subscribe(data=>
       {
           console.log(data);
           this.ngOnInit();
           this.toastr.success('Job Deleted Successfully', 'Job Master');
       },err=>
       {
           console.log('Not Delete Record');
           this.toastr.success('Job Not Deleted. Something is Wrong.', 'Job Master');
       });
   }

   checkboxCheck(event)
   {
      if(event.target.checked == true)
      {
        this.divShow = true;
      }
      else
      {
        this.divShow = false;
      }
   }

   SaveRawMaterial()
   {
      let data = this.jobForm.value;
      this.RawMaterial.push(data);
      console.log(this.RawMaterial);


      this.jobForm.controls.itmeName1.reset();
      this.jobForm.controls.itmeType1.reset();
      this.jobForm.controls.unit1.reset();
      this.jobForm.controls.HSN1.reset();
      this.jobForm.controls.weight1.reset();
      this.jobForm.controls.sqFeet1.reset();
      this.jobForm.controls.PurRate1.reset();
      this.jobForm.controls.SalesRate1.reset();
      this.jobForm.controls.Thickness1.reset();
   }

   itemSelectName(ele)
   {
     console.log(ele.value.material_id);
     this.jobservice.getRawMaterialDataid(ele.value.material_id).subscribe(data=>
      {
        console.log(data);
        this.jobForm.controls.itmeType1.setValue(data[0].item_type);
        this.jobForm.controls.unit1.setValue(data[0].unit);
        this.jobForm.controls.HSN1.setValue(data[0].hsn);
        this.jobForm.controls.weight1.setValue(data[0].weight);
        this.jobForm.controls.PurRate1.setValue(data[0].pur_rate);
        this.jobForm.controls.SalesRate1.setValue(data[0].sale_rate);
        this.jobForm.controls.Thickness1.setValue(data[0].thinkness);
        this.jobForm.controls.sqFeet1.setValue(data[0].feet);
     },err=>
     {

     })
   }
}
