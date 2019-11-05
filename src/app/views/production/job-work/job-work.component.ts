import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { JobworkService } from './jobwork.service';
@Component({
  selector: 'app-job-work',
  templateUrl: './job-work.component.html',
  styleUrls: ['./job-work.component.scss']
})
export class JobWorkComponent implements OnInit {

  companyData :any;
  PoData : any;
  JobData : any;
  config = {
    displayKey:"party_name", 
    search: true,
    height: 'auto', 
    placeholder:'Select Company Name',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }
  config1 = {
    displayKey:"po_id", 
    search: true,
    height: 'auto', 
    placeholder:'Select PO NO',  
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search' 
    //searchOnKey: 'name' 
  }
  constructor( private jobservice : JobworkService,private services : ServicesService) { 
    //get Party Data
    this.services.getPartyData().subscribe(data=>{
      this.companyData = data;
      console.log(this.companyData);
    },err=>{
      console.log(err);
    });
  }

  ngOnInit() {
  }
  CheckPODetials(ele)
  {
      let id = ele.value.party_id;
      this.jobservice.getPODetails(id).subscribe(data=>{
        console.log(data);
        this.PoData = data;
      },err=>{
        console.log(err);
      })
  }

  CheckJobWorkDetails(ele)
  {
    let poID = ele.value.po_id;
    this.jobservice.getJobWorkDetails(poID).subscribe(data=>{
      console.log(data);
      this.JobData = data;
    },err=>{
      console.log(err);
    })
  }

  getJodData(ele)
  {
    let joid = ele;
    let dtat = this.JobData.filter(data=>data.id == joid);
    console.log(dtat);
  }
  public toggle( element: HTMLElement) {
    element.classList.toggle('d-none');
  }
}
