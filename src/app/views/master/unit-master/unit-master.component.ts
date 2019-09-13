import { Component, OnInit } from '@angular/core';
import { UnitMasterService} from './unit-master.service';
@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.scss']
})
export class UnitMasterComponent implements OnInit {

  constructor(private unitservice : UnitMasterService) { 
    let data={
      'unit' : 'KG'
    }
    this.unitservice.insertUnit(data).subscribe(data=>{

    })
    // this.unitservice.insertUnit(data).subscribe(data=>{
    //   console.log(data);
    // },err=>{
    //   console.log(err);
    // })
  }

  ngOnInit() {
  }

  // submit()
  // {
    

  // }
}
