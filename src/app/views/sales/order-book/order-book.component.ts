import { Component, OnInit } from '@angular/core';
import { OrderBookService } from './order-book.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import {ChangeDetectorRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {
  poDetails =[];
  autoID :any;
  companyData :any;
  quotationData : any;
  JobMasterData : any;
  poDataList = [];
  sufaceTreatmentData : any;
  final_amt = 0;
  total = 0;
  exciseAmt;
  exciseRate = 0;
  isVisible : boolean = false;
  
  vatRate;
  varAmt;

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
    displayKey:"qutation_id", 
    search: true,
    height: 'auto', 
    placeholder:'Select Quotation Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
  }
  
  config2 = {
    displayKey:"job_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Job Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
  }

  config3 = {
    displayKey:"surface_treatment", 
    search: true,
    height: 'auto', 
    placeholder:'Select Surface Treatment',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
  }
  orderForm = new FormGroup({
    code             : new FormControl(''),
    pono             : new FormControl(''),
    name             : new FormControl(''),
    date             : new FormControl(''),
    quotationNo      : new FormControl(''),
    priority         : new FormControl(''),
    Deliverydate     : new FormControl(''),
    jname            : new FormControl(''),
    artno            : new FormControl(''),
    snd              : new FormControl(''),
    quantity         : new FormControl(''),
    rate             : new FormControl(''),
    surfaceTreatment : new FormControl('')
  });
  constructor(private services : ServicesService,private orderServices : OrderBookService,private changeDetectorRef: ChangeDetectorRef,private toastr: ToastrService) 
  { 
      this.orderServices.getPoIdDetails().subscribe(data=>{
          console.log(data);
          this.poDetails = data;
          this.autoID = this.poDetails.length;
          this.autoID = this.autoID + 1;
          this.orderForm.controls.pono.setValue(this.autoID);
      },err=>{
        console.log(err);
      });

      //get Party Data
      this.services.getPartyData().subscribe(data=>{
        this.companyData = data;
        console.log(this.companyData);
      },err=>{
        console.log(err);
      });

      //get Job Name
      this.services.getJobName().subscribe(data=>{
        console.log(data);
        this.JobMasterData = data;
      },err=>{
        console.log(err);
      });

      this.services.getSurfaceTreatement().subscribe(data=>{
        console.log(data);
        this.sufaceTreatmentData = data;
      },err=>{
        console.log(err);
      });
  }

  ngOnInit() {
    this.services.getJobName().subscribe(data=>{
      console.log(data);
      this.JobMasterData = data;
    },err=>{
      console.log(err);
    });

    this.services.getSurfaceTreatement().subscribe(data=>{
      console.log(data);
      this.sufaceTreatmentData = data;
    },err=>{
      console.log(err);
    });
  }


  //Check Quotation Value
  CheckQuotation(ele)
  {
    console.log(ele.value.party_id);
    this.orderServices.getQuotationDataForPo(ele.value.party_id).subscribe(data=>{
        console.log(data);
        this.quotationData = data;
    },err=>{
      console.log(err);
    })
  }

  //Check Quotation Data
  getQuotationDatas(ele)
  {
    this.orderServices.getQuotationDataForPoData(ele.value.qutation_id).subscribe(data=>{
      // console.log(data);  
        // this.poDataList = data;
        // let listofpoData = {
        //   'Jid' : data[0]

        // }
        let arraydata = [];
        arraydata.push(data);
        console.log(arraydata);
        for(let k in data)  
        {   
          let data1 = {
                  'jid' : data[k].jid,
                  'jname' : data[k].job_name,
                  'artno' : data[k].art_no,
                  'size'  : data[k].particular,
                  'qty'   : data[k].qty,
                  'rate'  : data[k].qrate,
                  'surface': '-'
                }
                this.poDataList.push(data1);
        }
        let total =0;
        this.poDataList.forEach(element => {
          let total2 = element.rate * element.qty;
          total = total + total2;
          this.total = total
        });
        this.final_amt = Number(this.total);
        console.log(this.poDataList);
    },err=>{
      console.log(err);
    })
  }

  //AddRow Data
  AddRow()
  {
    let data = this.orderForm.value;
    console.log(data);
    let data1 ={
      'jid'    : data.jname.id,
      'jname'  : data.jname.job_name,
      'artno'  : data.artno,
      'size'   : data.snd,
      'qty'    : data.quantity,
      'rate'   : data.rate,
      'surface': data.surfaceTreatment

    }
    this.poDataList.push(data1);
    let total =0 ;
    this.poDataList.forEach(element => {
      let total2 = element.rate * element.qty;
      total = total + total2;
      this.total = total
    });
    this.final_amt = this.total;
    this.orderForm.controls.jname.reset();
    this.orderForm.controls.artno.reset();
    this.orderForm.controls.snd.reset();
    this.orderForm.controls.quantity.reset();
    this.orderForm.controls.rate.reset();
    this.orderForm.controls.surfaceTreatment.reset();
    this.ngOnInit();


  }

  getJobDataForOrder(ele)
  {
    this.orderServices.getJobDataForPoData(ele.value.id).subscribe(data=>{
        this.orderForm.controls.artno.setValue(data[0].art_no);
    },err=>{
      console.log(err);
    })
  }

  removerow(i)
  {
    let total = 0;
    this.poDataList.splice(i, 1);
    this.changeDetectorRef.detectChanges();
    this.poDataList.forEach(element => {
      let total2 = element.rate * element.qty;
      total = total + total2;
    });
    this.total = total;
    this.final_amt = Number(this.total) + Number(this.exciseAmt) + Number(this.varAmt);
    // console.log(this.quoDetails);
  }

  checkExciseRate(ele)
  {
    if(this.total == 0)
    {
        alert('Please Fill Data First')
    }
    else
    {
       let amt = this.total/this.exciseRate;
       let amt1 = Number(this.total) + Number(amt);
       this.exciseAmt = amt.toFixed(2);

       this.final_amt = Number(this.exciseAmt) + Number(this.varAmt) + Number(this.total);
    }
  }
  checkVatRate(ele)
  {
    if(this.total == 0)
    {
      alert('Please file Data first');
    }
    else
    {
      let amt = this.total/this.vatRate;
      let amt1 = Number(this.total) + Number(amt);
      this.varAmt = amt.toFixed(2);
      this.final_amt = Number(this.exciseAmt) + Number(this.varAmt) + Number(this.total);
    }
  }

  //Submit Data
  submitData()
  {
     let data = this.orderForm.value;
     console.log(this.poDataList);
     data['PoDataList'] = this.poDataList;
     data['ExciseRate'] = this.exciseRate;
     data['vatRate']    = this.vatRate;
    console.log(data);
     this.orderServices.submitData(data).subscribe(data=>{
        this.total = 0;
        this.final_amt =0;
        this.exciseRate = 0;
        this.vatRate = 0;
        this.poDataList=[]; 
        this.ngOnInit();
        this.orderForm.reset();
        this.exciseAmt = 0;
        this.varAmt = 0;
        this.toastr.success('PO Order Saved Successfully');
     },err=>{
       console.log(err);
     })
  }

  editDomain(domain: any){
   
    domain.editable = !domain.editable;
    console.log(this.poDataList);
    let total =0 ;
    this.poDataList.forEach(element => {
      let total2 = element.rate * element.qty;
      total = total + total2;
      this.total = total
    });
    this.final_amt = this.total;
  }

}
