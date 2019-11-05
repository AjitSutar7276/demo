import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobworkService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getJobDataForPoData(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'getPODetailsCompany/'+id,{headers : httpHeader});
    return result;
  }

  getPODetails(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'getPODetailsCompany/'+id,{headers : httpHeader});
    return result;
  }

  getJobWorkDetails(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'getJobWorkDetails/'+id,{headers : httpHeader});
    return result;
  }
}
