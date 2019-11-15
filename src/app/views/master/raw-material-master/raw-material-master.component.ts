import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RawMaterialMasterService } from './raw-material-master.service';
import { ServicesService } from '../../services/services.service';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/upload';
// const URL = 'http://199.79.63.188:3000/api/upload';
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
  url        : any;
  ColumnMode = ColumnMode;
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

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
      id           : new FormControl(''),
      itemName     : new FormControl(''),
      itmeType     : new FormControl(''),
      unit         : new FormControl(''),
      HSN          : new FormControl(''),
      Used_in      : new FormControl(''),
      category     : new FormControl(''),
      weight       : new FormControl(''),
      feet         : new FormControl(''),
      pur_rate     : new FormControl(''),
      sale_rate    : new FormControl(''),
      op_stock     : new FormControl(''),
      thinkness    : new FormControl(''),
      minLevel     : new FormControl(''),
      maxLevel     : new FormControl(''),
      cgst         : new FormControl(''),
      sgst         : new FormControl(''),
      igst         : new FormControl(''),
      image        : new FormControl(''),
      imagePath    : new FormControl(''),
      img          : new FormControl('')
  })
  constructor(private rawService : RawMaterialMasterService,private service : ServicesService,private toastr: ToastrService) 
  {
      this.rawService.getRawMaterialData().subscribe(data=>{
        console.log(data);
        this.rawMaterialData = data;
        this.rows = data;
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
      this.rows = data;
      this.rawMaterialData = data;
      this.autoId = this.rawMaterialData.length;
      this.autoId = this.autoId + 1;
      this.rawMaterialForm.controls.id.setValue(this.autoId);
    },err=>{
      console.log(err);
    })
    this.uploader.onAfterAddingFile = (file) => { console.log(file);file.withCredentials = false; };
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event == undefined)
        {
            this.url = undefined;
        }
        else
        {
             this.url = reader.result;
        }
      }
    }
  }
  //submit Data 
  submitData()
  {
    console.log(this.rawMaterialForm.value);
     if(this.url == '')
     {
      let data = this.rawMaterialForm.value;
      console.log(data);
      this.rawService.submitData(data).subscribe(data =>{
        console.log(data);
        this.rawMaterialForm.reset();
        this.ngOnInit(); 
        this.toastr.success('Raw Matarial Saved Successfully', 'Machine Master');
      },err=>{
         console.log('Something Bad');
         this.toastr.success('Machine Not Saved. Something is Wrong.', 'Machine Master');
      })
     }
     else{
       this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
           console.log('ImageUpload:uploaded:', item, status, response);
           console.log(response);
           this.rawMaterialForm.controls.imagePath.setValue(response);
           let data = this.rawMaterialForm.value;
           console.log(data)
           // alert('File uploaded successfully');
           this.rawService.submitData(data).subscribe(data =>{
             console.log(data);
             this.rawMaterialForm.reset();
             this.ngOnInit(); 
             this.toastr.success('Raw Matarial Saved Successfully', 'Machine Master');
           },err=>{
              console.log('Something Bad');
              this.toastr.info('Machine Not Saved. Something is Wrong.', 'Machine Master');
           })
       };
       
     }
  }

  deleteRawMaterial(ele)
  {
    console.log(ele);
    this.rawService.deleteRaw(ele).subscribe(data=>{
      this.ngOnInit();
      this.toastr.success('Raw Matarial Delete Successfully')
    },err=>{
      this.toastr.info('Machine Not Delete. Something is Wrong')
    })
  }
}
