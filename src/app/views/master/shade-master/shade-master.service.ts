import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShadeMasterService {
  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getShadeid():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getunitID = this.httpClient.get(this.url+'getShade',{headers :httpHeader});
    return getunitID;
  }
  submitData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let insertData = this.httpClient.post(this.url+'insertShade',data,{headers : httpHeader});
    return insertData;
  }
  update(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getData = this.httpClient.get(this.url +'getShadeData/'+id,{headers:httpHeader});
    return getData;
  }
  deleteUnit(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let deleteData = this.httpClient.get(this.url+'deleteShade/'+id,{headers :httpHeader});
    return deleteData;
  }
  updateUnit(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let updateShadeData = this.httpClient.post(this.url+'updateShadeData',data,{headers : httpHeader});
    return updateShadeData;
  }
}
