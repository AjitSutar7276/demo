import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderReportService } from './order-report.service';
@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {

  orderData = [];
  id : any;
  totalCost : any = 0;
  totalCGST : any = 0;
  totalSGST : any = 0;
  packingChr: any = 0;
  transport : any = 0;
  finalCost : any = 0;

  constructor(private route: ActivatedRoute,private orderSerives : OrderReportService) 
  {
        //GET parameter in url below code use
        let totalF = 0;
        this.route.params.subscribe(params => {
          this.id = params.id;
          console.log(this.id);
       });
      this.orderSerives.getPODetailsID(this.id).subscribe(data=>{
        this.orderData = data;
        console.log(this.orderData);
        this.packingChr = this.orderData[0].pack_amt;
        this.transport  = this.orderData[0].transport_amt;
        this.orderData.forEach(ele=>{
              this.totalCost = this.totalCost + ele.rate * ele.qty;
              this.totalCGST = this.totalCGST + ele.rate * ele.qty * ele.cgst /100;
              this.totalSGST = this.totalSGST + ele.rate * ele.qty * ele.sgst / 100;

        })

        totalF = this.totalCost + this.packingChr + this.transport + this.totalCGST + this.totalSGST;
        this.finalCost = totalF.toFixed(2);
      },err=>{
        console.log(err);
      })
  }
  

  ngOnInit() {
  }

}
