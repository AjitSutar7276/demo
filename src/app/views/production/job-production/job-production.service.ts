import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobProductionService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getProcessData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.post(this.url+'getJobProcessMaster',{headers : httpHeader});
    return result;
  }

  getJobPendingData(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.post(this.url+'getJobPendingData',data,{headers : httpHeader});
    return result;
  }

  getEmployeeData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'getEmployeeData',{headers : httpHeader});
    return result;
  }

  SubmitData(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.post(this.url+'SubmitJobProducation',data,{headers : httpHeader});
    return result;
  }
}
