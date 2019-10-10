import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  unitData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getunitID = this.httpClient.get(this.url+'getunit',{headers :httpHeader});
    return getunitID;
  }

  getPartyData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url + 'getPartyData',{headers : httpHeader});
    return result;
  }

  getMaterailData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url + 'getMaterailData',{headers : httpHeader});
    return result;
  }

  getJobName():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'getJobMaster',{headers : httpHeader});
    return result;
  }

  getSurfaceTreatement():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'getSurfaceData',{headers : httpHeader});
    return result;
  }
}
