import { Component, OnInit } from '@angular/core';
import { QuotationListService } from './quotation-list.service';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {
  rows =[];
  constructor(private quotationServices : QuotationListService) {

      this.quotationServices.getQuotationDetailsData().subscribe(data=>{
        this.rows = data;
        console.log(this.rows);
      },err=>{
        console.log(err);
      })
   }

  ngOnInit() {
  }

}
