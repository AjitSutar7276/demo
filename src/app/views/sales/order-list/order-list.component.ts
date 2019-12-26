import { Component, OnInit } from '@angular/core';
import { OrderListService } from './order-list.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
rows =[];
  constructor(private orderService : OrderListService) { 
      this.orderService.getPODetailsData().subscribe(data=>{
        this.rows = data;
      },err=>{
        console.log(err);
      })
  }

  ngOnInit() {
  }

}
