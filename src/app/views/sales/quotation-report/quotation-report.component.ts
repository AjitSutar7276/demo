import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotationReportService } from './quotation-report.service';
@Component({
  selector: 'app-quotation-report',
  templateUrl: './quotation-report.component.html',
  styleUrls: ['./quotation-report.component.scss']
})
export class QuotationReportComponent implements OnInit {

  id : any;
  QuoData = [];
  QuoTotal = 0;

  constructor(private route: ActivatedRoute,private quotationSerives : QuotationReportService) { 

    //GET parameter in url below code use
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
   });

   //Get Quotation Data using id
   this.quotationSerives.getQuotationDetailsID(this.id).subscribe(data=>{
     this.QuoData = data;
     console.log(this.QuoData);
     //Quotation Total Show
   this.QuoData.forEach(ele=>{
    console.log(ele);
    let addition = 0;
    addition = ele.rate * ele.qty;
    this.QuoTotal = this.QuoTotal + addition;
 })
 console.log('total');
console.log(this.QuoTotal);
   },err=>{

   })

   

  }

  ngOnInit() {
    
  }

}
