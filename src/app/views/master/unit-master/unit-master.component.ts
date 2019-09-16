import { Component, OnInit } from '@angular/core';
import { UnitMasterService} from './unit-master.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.scss']
})
export class UnitMasterComponent implements OnInit {

  unitarray =[];
  id : any;
  updateShow : boolean = false;
  submitShow : boolean = true;
  //FormGroup object
  unitForm = new FormGroup({
    unit: new FormControl(''),
    ID  : new FormControl('')
  });
  constructor(private unitservice : UnitMasterService) { 
      //this function is used to auto increment unit id
      this.unitservice.getUnitid().subscribe(data=>{
        this.unitarray = data;
        this.id = this.unitarray.length;
        this.id = this.id + 1;
        this.unitForm.controls.ID.setValue(this.id);
      },err=>{
        console.log('Something is wrong');
      })

  }

  ngOnInit() {
    this.unitservice.getUnitid().subscribe(data=>{
      this.unitarray = data;
      this.id = this.unitarray.length;
      this.id = this.id + 1;
      this.unitForm.controls.ID.setValue(this.id);
    },err=>{
      console.log('Something is wrong');
    })
  }
  get unit() { return this.unitForm.get('unit'); }
  get ID() { return this.unitForm.get('ID');}
  //Edit data
  editUnit(ele)
  { 
      this.unitservice.update(ele).subscribe(data=>{
          console.log(data);
          this.unitForm.controls.ID.setValue(data[0].id);
          this.unitForm.controls.unit.setValue(data[0].unit);
          this.updateShow = true;
          this.submitShow = false;
      })
  }

  //delete data
  deleteUnit(eles)
  {
      this.unitservice.deleteUnit(eles).subscribe(data=>{
          console.log(data);
          this.ngOnInit();
      },err=>{
          console.log('Not Delete Record');
      })
  }
  //save data
  submitData()
  {
      let data = this.unitForm.value;
      this.unitservice.insertUnit(data).subscribe(data=>{
        console.log(data);
        this.unitForm.reset();
        this.ngOnInit();
      },err=>{
        console.log(err);
      })
  }

  //update data
  UpdateData()
  {
    let data = this.unitForm.value;
    this.unitservice.updateUnit(data).subscribe(data=>{
      console.log(data);
      this.unitForm.reset();
      this.updateShow = false;
      this.submitShow = true;
      this.ngOnInit();
    },err=>{
      console.log(err);
    })
  }
}
