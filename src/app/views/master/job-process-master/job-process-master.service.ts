import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobProcessMasterService {
  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getJobProccessMasterData():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getJob = this.httpClient.post(this.url +'getJobProcessMaster',{headers : httpHeader});
    return getJob;
  }

  submitData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let submitData = this.httpClient.post(this.url + 'SubmitJobData',data,{headers : httpHeader});
    return submitData;
  }

  deleteJob(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let deletedJobProcess = this.httpClient.get(this.url + 'deleteJobProcess/'+id,{headers :httpHeader});
    return deletedJobProcess;
  }

  update(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let editjobProcess = this.httpClient.get(this.url +'editJobProcess/'+id,{headers : httpHeader});
    return editjobProcess;
  }

  updateData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let updateJobProcess = this.httpClient.post(this.url+'updateJobProcess',data,{headers :httpHeader});
    return updateJobProcess;
  }
  
}
