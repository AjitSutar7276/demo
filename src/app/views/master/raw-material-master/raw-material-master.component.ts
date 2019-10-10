import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RawMaterialMasterService } from './raw-material-master.service';
import { ServicesService } from '../../services/services.service';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-raw-material-master',
  templateUrl: './raw-material-master.component.html',
  styleUrls: ['./raw-material-master.component.scss']
})
export class RawMaterialMasterComponent implements OnInit {

  rawMaterialData  = [];
  autoId : any;
  submitShow : boolean = true;
  updateShow : boolean = false;
  unitData   = [];
  mateialData = [];
  categoryData : any;

  config = {
    displayKey:"category_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Category Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }
  config1 = {
    displayKey:"category_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Item Type',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }


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
  constructor(private rawService : RawMaterialMasterService,private service : ServicesService,private toastr: ToastrService) 
  {
      this.rawService.getRawMaterialData().subscribe(data=>{
        console.log(data);
        this.rawMaterialData = data;
        this.autoId = this.rawMaterialData.length;
        this.autoId = this.autoId + 1;
        this.rawMaterialForm.controls.id.setValue(this.autoId);
        
      },err=>{
        console.log(err);
      });
      
      this.rawService.unitData().subscribe(data=>{
        console.log(data);
        this.unitData = data;
      },err=>{
        console.log(err);
      });

      //Get Category Master
      this.rawService.cotegoryData().subscribe(data=>{
        this.categoryData = data;
      },err=>{
        console.log(err);
      })
  }

  ngOnInit() 
  {
      this.rawService.getRawMaterialData().subscribe(data=>{
      console.log(data);
      this.rawMaterialData = data;
      this.autoId = this.rawMaterialData.length;
      this.autoId = this.autoId + 1;
      this.rawMaterialForm.controls.id.setValue(this.autoId);
    },err=>{
      console.log(err);
    })
  }

  //submit Data 
  submitData()
  {
    let data = this.rawMaterialForm.value;
    console.log(data);
    this.rawService.submitData(data).subscribe(data=>{
      console.log(data);
      this.toastr.success('Raw Material Saved Successfully', 'Raw Material Master');
    },err=>{
      console.log(err);
      this.toastr.success('Raw Material Not Saved. Something is Wrong.', 'Raw Material Master');
    })
  }

}
