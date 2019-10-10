import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class RawMaterialMasterService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getRawMaterialData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let rawmaterData = this.httpClient.get(this.url+'getRawMaterialData',{headers : httpHeader});
    return rawmaterData;
  }
  submitData(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let submitData = this.httpClient.post(this.url+'submitRawData',data,{headers : httpHeader});
    return submitData;
  }

  unitData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let unitData = this.httpClient.get(this.url+'getunit',{headers : httpHeader});
    return unitData;
  }

  cotegoryData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let cotegoryData = this.httpClient.get(this.url + 'getCotegoryData',{headers : httpHeader});
    return cotegoryData;
  }
}
