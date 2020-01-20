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
  output : any;
  totalData : any;
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
  console.log(this.QuoTotal + this.QuoData[0].pack_amt + this.QuoData[0].transport_amt);
  this.totalData = this.QuoTotal + this.QuoData[0].pack_amt + this.QuoData[0].transport_amt;
  this.output = this.price_in_words(Math.round(this.totalData));
  console.log(this.output);
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
 public price_in_words(price) {
  var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    handle_tens = function(dgt, prevDgt) {
      return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
    },
    handle_utlc = function(dgt, nxtDgt, denom) {
      return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
    };

  var str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (price += "", isNaN(parseInt(price))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
      case 0:
        words.push(handle_utlc(digit, nxtDigit, ""));
        break;
      case 1:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 2:
        words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
        break;
      case 3:
        words.push(handle_utlc(digit, nxtDigit, "Thousand"));
        break;
      case 4:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 5:
        words.push(handle_utlc(digit, nxtDigit, "Lakh"));
        break;
      case 6:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 7:
        words.push(handle_utlc(digit, nxtDigit, "Crore"));
        break;
      case 8:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 9:
        words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
    }
    str = words.reverse().join("")
  } else str = "";
  return str

}




}
