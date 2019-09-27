import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class MachineMasterService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getMachineData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let getData = this.httpClient.get(this.url+'getMachineData',{headers :httpHeader});
    return getData;
  }

  //Submit Data
  submitData(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let submitData = this.httpClient.post(this.url+'SubmitMachineData',data,{headers : httpHeader});
    return submitData;
  }

  //delete Machine
  deleteMachine(id):Observable<any>
  {
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let deleteData = this.httpClient.get(this.url+'deleteMachine/'+id,{headers : httpHeader});
    return deleteData;
  }

  //edit Machine
  editMachine(ele):Observable<any>
  {
    let httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let editData = this.httpClient.get(this.url+'editMachineData/'+ele,{headers : httpHeader});
    return editData;
  }

  //Update Machine
  updateMachine(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let updateData = this.httpClient.post(this.url+'updateMachine',data,{headers : httpHeader});
    return updateData;
  }
}
