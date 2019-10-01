import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { QuotationMasterService } from './quotation-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotation-master',
  templateUrl: './quotation-master.component.html',
  styleUrls: ['./quotation-master.component.scss']
})
export class QuotationMasterComponent implements OnInit {

  unitData  : any;
  quoData  = [];
  autoId   : any;
  quoDetails  = [];
  companyData : any;
  MaterailDataList : any;
  total1 : any;
  servicess = {};
  packAmt  : any = 0;
  trafAmt  : any = 0;
  finalAmt : any = 0;

  config = {
    displayKey:"party_name", 
    search:true ,
    height: 'auto', 
    placeholder:'Select Company Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' ,
    searchOnKey: 'name' 
  }

  config1 = {
    displayKey:"material_name", 
    search:true ,
    height: 'auto', 
    placeholder:'Select Material Code',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' ,
    searchOnKey: 'name' 
  }

  config2 = {
    displayKey:"unit", 
    search:true ,
    height: 'auto', 
    placeholder:'Select Unit',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' ,
    searchOnKey: 'name' 
  }
    public quotationForm = new FormGroup({
    billno        : new FormControl(''),
    quo_date      : new FormControl(''),
    name          : new FormControl(''),
    materialcode  : new FormControl(''),
    perticulars   : new FormControl(''),
    quantity      : new FormControl(''),
    unit          : new FormControl(''),
    rate          : new FormControl('')
  });
    public quotationDetails = new FormGroup({
        rule : new FormControl([]),

    })
  constructor(private services : ServicesService,private quoSerive : QuotationMasterService,private toastr: ToastrService) {
    //Unit Data
    this.services.unitData().subscribe(data=>{
      this.unitData = data;
    },err=>{
      console.log(err);
    });

    //Quotation bill id
    this.quoSerive.getQuotationData().subscribe(data=>{
      this.quoData = data;
      this.autoId = this.quoData.length;
      this.autoId = this.autoId + 1;
      this.quotationForm.controls.billno.setValue(this.autoId);
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

    //Get materail Data
    this.services.getMaterailData().subscribe(data=>{
      this.MaterailDataList = data;
    },err=>{
      console.log(err);
    })
   }

  ngOnInit() {
    this.services.getMaterailData().subscribe(data=>{
      this.MaterailDataList = data;
    },err=>{
      console.log(err);
    });

    this.services.unitData().subscribe(data=>{
      this.unitData = data;
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

  }

  addIntoRow()
  {
    let total = 0;

    let data = this.quotationForm.value;
    this.quoDetails.push(data);
    this.quoDetails.forEach(element => {
      let total2 = element.rate * element.quantity;
      total = total + total2;
    });
    this.total1 = total;
    this.finalAmt = Number(this.packAmt) + Number(this.trafAmt) + Number(this.total1);
    this.quotationForm.get('materialcode').reset();
    this.quotationForm.get('perticulars').reset(); 
    this.quotationForm.get('quantity').reset(); 
    this.quotationForm.get('unit').reset(); 
    this.quotationForm.get('rate').reset(); 
    this.ngOnInit();
    console.log(this.quoDetails);
  }

  getData()
  {
    console.log(this.servicess);
  }

  packValue()
  {
    this.finalAmt = Number(this.packAmt) + Number(this.trafAmt) + Number(this.total1);
  }

  trafValue()
  {
    this.finalAmt = Number(this.packAmt) + Number(this.trafAmt) + Number(this.total1);
  }

  submitData()
  {
      let data = this.quotationForm.value;
      // data.push(this.quoDetails);
      data['quoDetails'] = this.quoDetails;
      data['packCharge'] = this.packAmt;
      data['transfortCharge'] = this.trafAmt;
      data['TermsCondition'] = this.servicess;

      this.quoSerive.submitData(data).subscribe(data=>{
        this.quoDetails.length = 0;
        this.packAmt = 0;
        this.servicess = {};
        this.trafAmt = 0;
        this.total1 = 0;
        this.finalAmt = 0;
        this.quotationForm.reset();
        this.ngOnInit();
        this.toastr.success('Quotation Saved Successfully', 'Quotation Master');
      },err=>{  
        console.log(err);
        this.toastr.success('Quotation Not Saved. Something is Wrong.', 'Quotation Master');
      })
      console.log(data);
  }
}
