import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RawMaterialMasterService } from './raw-material-master.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-raw-material-master',
  templateUrl: './raw-material-master.component.html',
  styleUrls: ['./raw-material-master.component.scss']
})
export class RawMaterialMasterComponent implements OnInit {

  rawMaterialForm = new FormGroup({
      id       : new FormControl(''),
      itemName : new FormControl(''),
      itmeType : new FormControl(''),
      unit     : new FormControl(''),
      HSN      : new FormControl(''),
      Used_in  : new FormControl(''),
      category : new FormControl(''),
      weight   : new FormControl(''),
      feet     : new FormControl(''),
      pur_rate : new FormControl(''),
      sale_rate: new FormControl(''),
      op_stock : new FormControl(''),
      thinkness: new FormControl(''),
      minLevel : new FormControl(''),
      maxLevel : new FormControl(''),
      cgst     : new FormControl(''),
      sgst     : new FormControl(''),
      igst     : new FormControl('')
  })
  constructor(private rawService : RawMaterialMasterService) 
  {
      this.rawService.getRawMaterialData().subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
  }

  ngOnInit() 
  {

  }

}
