import { Component, OnInit } from '@angular/core';
import { OrderBookService } from './order-book.service';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  constructor(private orderServices : OrderBookService) 
  { 
      this.orderServices.getPoIdDetails().subscribe(data=>{
          
      },err=>{
        console.log(err);
      })
  }

  ngOnInit() {
  }

}
