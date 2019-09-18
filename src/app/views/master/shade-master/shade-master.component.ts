import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShadeMasterService} from './shade-master.service';
@Component({
  selector: 'app-shade-master',
  templateUrl: './shade-master.component.html',
  styleUrls: ['./shade-master.component.scss']
})
export class ShadeMasterComponent implements OnInit {

  autoId : any;
  shadeArray = [];
  updateShow : boolean = false;
  submitShow : boolean = true;

  //FormGroup object
  shadeForm = new FormGroup({
    id: new FormControl(''),
    shade  : new FormControl(''),
    process : new FormControl('')
  });
  constructor( private shadeservice : ShadeMasterService) 
  {
    //auto increament id
    this.shadeservice.getShadeid().subscribe(data=>{
        console.log(data);
        this.shadeArray = data;
        this.autoId = this.shadeArray.length;
        this.autoId = this.autoId + 1;
        this.shadeForm.controls.id.setValue(this.autoId);

    },err=>{
      console.log('Something Bad!!!!');
    })
  }
  get shade(){return this.shadeForm.get('shade');}
  get process(){return this.shadeForm.get('process');}
  ngOnInit() {
    this.shadeservice.getShadeid().subscribe(data=>{
      console.log(data);
      this.shadeArray = data;
      this.autoId = this.shadeArray.length;
      this.autoId = this.autoId + 1;
      this.shadeForm.controls.id.setValue(this.autoId);

  },err=>{
    console.log('Something Bad!!!!');
  })
  }
  //Edit Shade Master
  editUnit(ele)
  { 
      this.shadeservice.update(ele).subscribe(data=>{
          console.log(data);
          this.shadeForm.controls.id.setValue(data[0].id);
          this.shadeForm.controls.shade.setValue(data[0].shade_name);
          this.shadeForm.controls.process.setValue(data[0].process_for);
          this.updateShow = true;
          this.submitShow = false;
      })
  }

  //delete data
  deleteUnit(eles)
  {
      this.shadeservice.deleteUnit(eles).subscribe(data=>{
          console.log(data);
          this.ngOnInit();
      },err=>{
          console.log('Not Delete Record');
      })
  }
  //Insert Shade-Master Data
  submitData()
  {
    let data = this.shadeForm.value;
    this.shadeservice.submitData(data).subscribe(data=>{
      console.log(data);
      this.shadeForm.reset();
      this.ngOnInit();
    },err=>{
      console.log('Data Not insert');
    })
  }

    //update data
    updateData()
    {
      let data = this.shadeForm.value;
      this.shadeservice.updateUnit(data).subscribe(data=>{
        console.log(data);
        this.shadeForm.reset();
        this.updateShow = false;
        this.submitShow = true;
        this.ngOnInit();
      },err=>{  
        console.log(err);
      })
    }

}
