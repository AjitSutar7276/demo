import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MachineMasterService } from './machine-master.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-machine-master',
  templateUrl: './machine-master.component.html',
  styleUrls: ['./machine-master.component.scss']
})
export class MachineMasterComponent implements OnInit {
  machineData =[];
  autoId : any;
  updateShow : boolean = false;
  submitShow : boolean = true;
  url        : any;
  
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  //this is FormGroup Object
  MachineForm = new FormGroup({
    id           : new FormControl(''),
    Machine_name : new FormControl(''),
    Description  : new FormControl(''),
    Make         : new FormControl(''),
    capacity     : new FormControl(''),
    process      : new FormControl(''),
    pur_date     : new FormControl(''),
    Warranty     : new FormControl(''),
    image        : new FormControl('')
  })
  constructor(private machineService : MachineMasterService) {
    this.machineService.getMachineData().subscribe(data=>{
      this.machineData = data;
      this.autoId = this.machineData.length;
      this.autoId = this.autoId + 1;
      this.MachineForm.controls.id.setValue(this.autoId);
    },err=>{
        console.log('Something Is Bad');
    });
   }

   //submit Data 
   submitData()
   {
       let data = this.MachineForm.value;
       console.log(data);
       this.machineService.submitData(data).subscribe(data =>{
         console.log(data);
         this.MachineForm.reset();
         this.ngOnInit(); 
       },err=>{
          console.log('Something Bad');
       })
   }
  ngOnInit() {

    this.machineService.getMachineData().subscribe(data=>{
      this.machineData = data;
      this.autoId = this.machineData.length;
      this.autoId = this.autoId + 1;
      this.MachineForm.controls.id.setValue(this.autoId);
    },err=>{
        console.log(err);
    });

    this.uploader.onAfterAddingFile = (file) => { console.log(file);file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         console.log(response);
         alert('File uploaded successfully');
     };

  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event == undefined)
        {

        }
        else
        {
             this.url = event.target.result;
        }
      }
    }
}
  //delete Machine function
  deleteMachine(ele)
  {
     this.machineService.deleteMachine(ele).subscribe(data=>{
        console.log(data);
        this.ngOnInit();
     },err=>{
       console.log(err);
     })
  }

  //Edit Machine Function
  editMachine(ele)
  {
    this.machineService.editMachine(ele).subscribe(data=>{
      console.log(data);
      this.updateShow = true;
      this.submitShow = false;
      this.MachineForm.controls.id.setValue(data[0].machine_id);
      this.MachineForm.controls.Machine_name.setValue(data[0].machine_name);
      this.MachineForm.controls.Description.setValue(data[0].description);
      this.MachineForm.controls.Make.setValue(data[0].make);
      this.MachineForm.controls.capacity.setValue(data[0].capacity);
      this.MachineForm.controls.process.setValue(data[0].process);
      this.MachineForm.controls.pur_date.setValue(data[0].purchase_date);
      this.MachineForm.controls.Warranty.setValue(data[0].warranty);

    },err=>{
      console.log(err);
    })
  }

  CancelData()
  {
    this.MachineForm.reset();
    this.ngOnInit();
    this.updateShow = false;
      this.submitShow = true;
  }

  updateData()
  {
    let data = this.MachineForm.value;
    console.log(data);
    this.machineService.updateMachine(data).subscribe(data=>{
      this.updateShow = false;
      this.submitShow = true;
      this.MachineForm.reset();
      this.ngOnInit();
    },err=>{
      console.log(err);
    })
  }

}
