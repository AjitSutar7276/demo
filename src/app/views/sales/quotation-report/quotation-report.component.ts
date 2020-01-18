import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotationReportService } from './quotation-report.service';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { config} from '../../../common/ServerConfig';

@Component({
  selector: 'app-quotation-report',
  templateUrl: './quotation-report.component.html',
  styleUrls: ['./quotation-report.component.scss']
})
export class QuotationReportComponent implements OnInit {
  private url : string = config.baseurl;
  id : any;
  QuoData = [];
  QuoTotal = 0;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'myTableIdElementId', // the id of html/table element,
    options: { // html-docx-js document options
      orientation: 'portrait',
      margins: {
        top: '-20'
      }
    }
  }
  constructor(private route: ActivatedRoute,private r : Router,private quotationSerives : QuotationReportService,private exportAsService: ExportAsService) { 
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



  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

}





}
