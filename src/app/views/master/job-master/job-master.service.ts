import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobMasterService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }


  getJobMasterData():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getJob = this.httpClient.get(this.url+'getJobMaster',{headers :httpHeader});
    return getJob;
  }

  submitData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let submitJob = this.httpClient.post(this.url+'SubmitJob',data,{headers :httpHeader});
    return submitJob;
  }

  deleteJob(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let deleteJob = this.httpClient.get(this.url+'deleteJob/'+id,{headers : httpHeader});
    return deleteJob;
  }

  update(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let update = this.httpClient.get(this.url+'updateDatas/'+id,{headers : httpHeader})
    return update;
  }

  updateJobData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let updateData = this.httpClient.post(this.url+'updateJobDatas',data,{headers:httpHeader});
    return updateData;
  }
  cotegoryData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let cotegoryData = this.httpClient.get(this.url + 'getCotegoryData',{headers : httpHeader});
    return cotegoryData;
  }

  unitData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let unitData = this.httpClient.get(this.url+'getunit',{headers : httpHeader});
    return unitData;
  }

  getRawMaterialData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let RawData = this.httpClient.get(this.url+'getRawMaterialData',{headers : httpHeader});
    return RawData; 
  }

  getRawMaterialDataid(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let rawData = this.httpClient.get(this.url+'getRawMaterialDataid/'+id,{headers : httpHeader});
    return rawData;
  }
}
