import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PartyMasterService } from './party-master.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-party-master',
  templateUrl: './party-master.component.html',
  styleUrls: ['./party-master.component.scss']
})
export class PartyMasterComponent implements OnInit {

  submitShow : boolean = true;
  updateShow : boolean = false;
  partyData = [];
  autoId   : any;

  partyForm = new FormGroup({
    Customer : new FormControl(''),
    ptName   : new FormControl(''),
    address  : new FormControl(''),
    phone    : new FormControl(''),
    mob1     : new FormControl(''),
    mob2     : new FormControl(''),
    fax      : new FormControl(''),
    gst      : new FormControl('')      
  })
  constructor(private partyServies : PartyMasterService,private toastr: ToastrService) 
  { 
      this.partyServies.getPartyData().subscribe(data=>{
          console.log(data);
          this.partyData = data;
      },err=>{  
        console.log(err);
      })
  }

  ngOnInit() {
    this.partyServies.getPartyData().subscribe(data=>{
      console.log(data);
      this.partyData = data;
    },err=>{  
      console.log(err);
    })
  }

  submitData()
  {
    let data = this.partyForm.value;
    console.log(data);
    this.partyServies.submit(data).subscribe(data=>{
      this.ngOnInit();
      this.toastr.success('Party Saved Successfully', 'Party Master');
    },err=>{
      console.log(err);
      this.toastr.success('Party Not Saved. Something is Wrong.', 'Party Master');
    })
  }

  //editPartyData 
  editPartyData(ele)
  {
    this.partyServies.editPartyData(ele).subscribe(data=>{
      console.log(data);
      this.partyForm.controls.ptName.setValue(data[0].party_name);
      this.partyForm.controls.address.setValue(data[0].address);
      this.partyForm.controls.phone.setValue(data[0].phone);
      this.partyForm.controls.mob1.setValue(data[0].mobile_1);
      this.partyForm.controls.mob2.setValue(data[0].mobile_2);
      this.partyForm.controls.fax.setValue(data[0].fax);
      this.partyForm.controls.gst.setValue(data[0].gst);
      this.partyForm.controls.Customer.setValue(data[0].party_type);
      this.toastr.success('Party Updated Successfully', 'Party Master');
    },err=>{
      console.log(err);
      this.toastr.success('Party Not Updated. Something is Wrong.', 'Party Master');
    })
  }

  //Delete Party Data
  deletePartyData(ele)
  {
    alert(ele);
    this.partyServies.deletePartyData(ele).subscribe(data=>{
        this.ngOnInit();
        this.toastr.success('Party Deleted Successfully', 'Party Master');
    },err=>{
      console.log(err);
      this.toastr.success('Party Not Deleted. Something is Wrong.', 'Party Master');
    })
  }
}
