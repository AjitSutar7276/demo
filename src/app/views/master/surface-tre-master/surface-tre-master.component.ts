import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UnitMasterService } from '../unit-master/unit-master.service';
import { SurfaceTreMasterService } from './surface-tre-master.service';
@Component({
  selector: 'app-surface-tre-master',
  templateUrl: './surface-tre-master.component.html',
  styleUrls: ['./surface-tre-master.component.scss']
})
export class SurfaceTreMasterComponent implements OnInit {

  unitArray = [];
  autoId : any;
  surfaceArray = [];
  updateShow : boolean = false;
  submitShow : boolean = true;
  surfaceForm = new FormGroup({
      id          : new FormControl(''),
      surfaceName : new FormControl(''),
      unit        : new FormControl(''),
      pur_rate    : new FormControl(''),
      sale_rate   : new FormControl('')
  });

  get id() {return this.surfaceForm.get('id');}
  get surfaceName() {return this.surfaceForm.get('surfaceName');}
  get unit() { return this.surfaceForm.get('unit');}
  get pur_rate() { return this.surfaceForm.get('pur_rate');}
  get sale_rate() { return this.surfaceForm.get('sale_rate');}


  constructor(private unitservice : UnitMasterService,private surfaceService : SurfaceTreMasterService) {
    this.unitservice.getUnitid().subscribe(data=>{
        this.unitArray = data;
        console.log(this.unitArray);
    });

    this.surfaceService.getSurfaceData().subscribe(data=>{
      console.log(data);
      this.surfaceArray = data;
      this.autoId = this.surfaceArray.length;
      this.autoId = this.autoId + 1;

      this.surfaceForm.controls.id.setValue(this.autoId);
    },err=>{
      console.log('Something is wrong');
    });
   }

  ngOnInit() {
    this.surfaceService.getSurfaceData().subscribe(data=>{
      console.log(data);
      this.surfaceArray = data;
      this.autoId = this.surfaceArray.length;
      this.autoId = this.autoId + 1;

      this.surfaceForm.controls.id.setValue(this.autoId);
    },err=>{
      console.log('Something is wrong');
    });
  }

  submitData()
  {
      let data = this.surfaceForm.value;
      console.log(data);
      this.surfaceService.submitData(data).subscribe(data=>{
        console.log(data);
        this.surfaceForm.reset();
        this.ngOnInit();
      },err=>{
        console.log('Something is bad');
      })
  }

  deleteSurface(ele)
  {
    this.surfaceService.deleteSurface(ele).subscribe(data=>{
      this.ngOnInit()
    },err=>{
      console.log('Not Deleted');
    })
  }

  editSurface(ele)
  {
    this.surfaceService.editSurface(ele).subscribe(data=>{
      this.surfaceForm.controls.id.setValue(data[0].id);
      this.surfaceForm.controls.surfaceName.setValue(data[0].surface_treatment);
      this.surfaceForm.controls.unit.setValue(data[0].unit_in);
      this.surfaceForm.controls.pur_rate.setValue(data[0].purchase_rate);
      this.surfaceForm.controls.sale_rate.setValue(data[0].sale_rate);
      this.updateShow = true;
      this.submitShow = false;
    },err=>{

    })
  }

  updateData()
  {
    let data = this.surfaceForm.value;
    this.surfaceService.updateData(data).subscribe(data=>{
      this.surfaceForm.reset();
      this.ngOnInit();

      this.submitShow = true;
      this.updateShow = false;
    })
  }
}
