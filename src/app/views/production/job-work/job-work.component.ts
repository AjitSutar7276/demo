import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { JobworkService } from './jobwork.service';
import { FormGroup, FormControl } from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-work',
  templateUrl: './job-work.component.html',
  styleUrls: ['./job-work.component.scss']
})
export class JobWorkComponent implements OnInit {

  companyData :any;
  PoData : any;
  JobData : any;
  materialData : any;
  surfaceData : any;
  JobWorkList = [];
  RawCost : any = 0;
  productionCost : any = 0;
  surfaceCost : any = 0;
  fittingChrg : any = 0;
  packingFord : any = 0;
  TotalCoast  : any = 0;
  processData : any;
  processDataList = [];
  RawMaterialData = [];
  RawString : string;

  config = {
    displayKey:"party_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Company Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }
  config1 = {
    displayKey:"po_id", 
    search: true,
    height: 'auto', 
    placeholder:'Select PO NO',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

  config2 = {
    displayKey:"itme_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Material',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

  config3 = {
    displayKey:"surface_treatment", 
    search: true,
    height: 'auto', 
    placeholder:'Select Surface Tre.',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }

  config4 ={
    displayKey:"process_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Process Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }
  JobWork = new FormGroup({
    comName : new FormControl(''),
    PONo    : new FormControl(''),
    code    : new FormControl(''),
    jobName : new FormControl(''),
    jobID   : new FormControl(''),
    size    : new FormControl(''),
    art_no  : new FormControl(''),
    qty     : new FormControl(''),
    amt     : new FormControl(''),
    ItemType: new FormControl(''),
    qty1    : new FormControl(''),
    Lenght  : new FormControl(''),
    Width   : new FormControl(''),
    height  : new FormControl(''),
    surface : new FormControl(''),
    Thickness : new FormControl(''),
    ProcessType : new FormControl(''),
    ProcessTime : new FormControl('')

  })
  constructor( private jobservice : JobworkService,private services : ServicesService,private changeDetectorRef: ChangeDetectorRef,private toastr: ToastrService) { 
    //get Party Data
    this.services.getPartyData().subscribe(data=>{
      this.companyData = data;
      console.log(this.companyData);
    },err=>{
      console.log(err);
    });

    
    //get Material Data
    this.services.getRawMaterialData().subscribe(data=>{
      this.materialData = data;
      console.log(data);
    },err=>{
      console.log(err);
    })

    //get surface Treatement
    this.services.getSurfaceTreatement().subscribe(data=>{
      this.surfaceData = data;
      console.log(data);
    },err=>{
      console.log(err);
    }) 

    //get Job Process Data 
    this.services.getProcessData().subscribe(data=>{
      this.processData = data;
    },err=>{
      console.log(err);
    })
  }



  ngOnInit() {
      //get Material Data
      this.services.getRawMaterialData().subscribe(data=>{
        this.materialData = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  
      //get surface Treatement
      this.services.getSurfaceTreatement().subscribe(data=>{
        this.surfaceData = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
      

    //get Job Process Data 
    this.services.getProcessData().subscribe(data=>{
      this.processData = data;
    },err=>{
      console.log(err);
    })
  }
  CheckPODetials(ele)
  {
      let id = ele.value.party_id;
      this.jobservice.getPODetails(id).subscribe(data=>{
        console.log(data);
        this.PoData = data;
      },err=>{
        console.log(err);
      })
  }

  CheckJobWorkDetails(ele)
  {
    let poID = ele.value.po_id;
    this.jobservice.getJobWorkDetails(poID).subscribe(data=>{
      console.log(data);
      this.JobData = data;
    },err=>{
      console.log(err);
    })
  }

  getJodData(ele)
  {
    let joid = ele;
    let dtat = this.JobData.filter(data=>data.id == joid);

    this.jobservice.getRawmaterialdata(ele).subscribe(data=>{
       let raw = []
       this.RawString = data[0].RawDetails;
       raw = this.RawString.split(',');
       raw.forEach(element => {
        var ret = element.replace('undefined','');
        if(ret != '')
        {
          this.RawMaterialData.push(ret);
        }
       });
       console.log(this.RawMaterialData);
       this.jobservice.getRawDetails(this.RawMaterialData).subscribe(data=>{
        console.log(data);
        data.forEach(ele => {
          let data1 = {
            'jobWorkName' : data[ele].itme_name,
            'jodid'       : data.It.material_id,
            'QTY'         : data.qty1,
            'lenght'      : data.Lenght,
            'width'       : data.Width,
            'Height'      : data.height,
            'Thick'       : data[ele].thinkness,
            'SurfaceName' : data.surface.surface_treatment,
            'surfaceid'   : data.surface.id,
            'purCost'     : data[ele].pur_rate,
          }
      
          // this.JobWorkList.push(data1);
        });
       
       },err=>{
         console.log(err);
       })
        
    },err=>{
      console.log(err);
    })
    console.log(dtat);
    this.JobWork.controls.jobName.setValue(dtat[0].job_name);
    this.JobWork.controls.jobID.setValue(dtat[0].id);
    this.JobWork.controls.size.setValue(dtat[0].sizeandDescription);
    this.JobWork.controls.art_no.setValue(dtat[0].art_no);
    this.JobWork.controls.qty.setValue(dtat[0].qty);
    // this.JobWork.controls.
  }

  GetMaterialData(ele)
  {
    // console.log(ele);
    let data = ele.value;
    this.JobWork.controls.Lenght.setValue('0');
    this.JobWork.controls.Width.setValue(data.weight);
    this.JobWork.controls.height.setValue('0');
    this.JobWork.controls.Thickness.setValue(data.thinkness);

  }
  public toggle( element: HTMLElement) {
    element.classList.toggle('d-none');
  }

  //Add row
  AddRow()
  {
    let data = this.JobWork.value;
    console.log(data);
    let data1 = {
      'jobWorkName' : data.ItemType.itme_name,
      'jodid'       : data.ItemType.material_id,
      'QTY'         : data.qty1,
      'lenght'      : data.Lenght,
      'width'       : data.Width,
      'Height'      : data.height,
      'Thick'       : data.Thickness,
      'SurfaceName' : data.surface.surface_treatment,
      'surfaceid'   : data.surface.id,
      'purCost'     : data.ItemType.pur_rate,
    }

    this.JobWorkList.push(data1);
    this.JobWork.controls.Lenght.reset();
    this.JobWork.controls.Width.reset();
    this.JobWork.controls.height.reset();
    this.JobWork.controls.Thickness.reset();
    this.JobWork.controls.surface.reset();
    // this.JobWork.controls.jobName.reset();
    this.JobWork.get('ItemType').reset();
    this.JobWork.controls.qty1.reset();
    this.ngOnInit();
    let rawTotal = 0;
    this.JobWorkList.forEach(element => {
        rawTotal = element.QTY * element.purCost;
    });

    this.RawCost = rawTotal;
    this.TotalCoast = Number(this.RawCost) + Number(this.productionCost) +Number(this.surfaceCost) + Number(this.fittingChrg) + Number(this.packingFord);
  }

  removerow(i)
  {
    let total = 0;
    this.JobWorkList.splice(i, 1);
    this.changeDetectorRef.detectChanges();
    // this.poDataList.forEach(element => {
    //   let total2 = element.rate * element.qty;
    //   total = total + total2;
    // });
    // this.total = total;
    // this.final_amt = Number(this.total) + Number(this.exciseAmt) + Number(this.varAmt);
    // console.log(this.quoDetails);
  }

  editDomain(domain: any){
   
    domain.editable = !domain.editable;
    console.log(this.JobWorkList);
    // let total =0 ;
    // this.JobWorkList.forEach(element => {
    //   let total2 = element.rate * element.qty;
    //   total = total + total2;
    //   this.total = total
    // });
    // this.final_amt = this.total;
    let rawTotal = 0;
    this.JobWorkList.forEach(element => {
        rawTotal = element.QTY * element.purCost;
    });

    this.RawCost = rawTotal;
    this.TotalCoast = Number(this.RawCost) + Number(this.productionCost) +Number(this.surfaceCost) + Number(this.fittingChrg) + Number(this.packingFord);
  }

  GetProductionCost(ele)
  {
    debugger
     if(ele>100)
     {
       alert('Please insert correct Data');
     }
     else
     {
        let prod = this.RawCost / Number(ele.target.value);
        this.productionCost = prod;
        this.TotalCoast = Number(this.RawCost) + Number(this.productionCost) +Number(this.surfaceCost) + Number(this.fittingChrg) + Number(this.packingFord);
     }
  }

  GetSurfaceCost(ele)
  {
    this.surfaceCost = Number(ele);
    this.TotalCoast = Number(this.RawCost) + Number(this.productionCost) +Number(this.surfaceCost) + Number(this.fittingChrg) + Number(this.packingFord);
  }

  fittingCost(ele)
  {
    this.fittingChrg = Number(ele);
    this.TotalCoast = Number(this.RawCost) + Number(this.productionCost) +Number(this.surfaceCost) + Number(this.fittingChrg) + Number(this.packingFord);
  }

  packingCost(ele)
  {
    this.packingFord = Number(ele);
    this.TotalCoast = Number(this.RawCost) + Number(this.productionCost) +Number(this.surfaceCost) + Number(this.fittingChrg) + Number(this.packingFord);
  }

  GetProcessData()
  {
    // console.log(event);
    let data = this.JobWork.value;
    console.log(data);
    let data1 = {
      'processID'   : data.ProcessType.id,
      'processName' : data.ProcessType.process_name,
      'processTime' : data.ProcessTime
    }

    this.processDataList.push(data1);
    this.JobWork.controls.ProcessTime.reset();
    this.JobWork.controls.ProcessType.reset();
  }

  SubmitData()
  {
    let data = this.JobWork.value;
    // console.log(this.poDataList);
    data['processData'] = this.processDataList;
    data['jobworklist'] = this.JobWorkList;
    data['productionCost']=this.productionCost;
    data['sufaceCost'] = this.surfaceCost;
    data['fittingCost'] = this.fittingChrg;
    data['packingCost'] = this.packingFord;


    console.log(data);
    this.jobservice.submitData(data).subscribe(data=>{
      console.log('data insert successfully');
      this.toastr.success('Job Work Data Save Successfully', '');
      this.JobWork.reset();
      this.RawCost = 0;
      this.productionCost = 0;
      this.surfaceCost = 0;
      this.fittingChrg = 0;
      this.packingFord = 0;
      this.TotalCoast = 0;
      this.JobWorkList = [];
      this.processDataList = [];
      this.ngOnInit();
    },err=>{
      console.log(err);
    })
   
  }
}
