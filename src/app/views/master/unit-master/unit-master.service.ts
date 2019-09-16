import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UnitMasterService {
  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  insertUnit(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    console.log(data);
   let insertuint = this.httpClient.post(this.url + 'insertUnit',data,{headers : httpHeader});
   return insertuint;
  }

  getUnitid():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getunitID = this.httpClient.get(this.url+'getunit',{headers :httpHeader});
    return getunitID;
  }

  deleteUnit(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let unitid = this.httpClient.post(this.url + 'deleteUnit/'+id,{headers:httpHeader});
    return unitid;
  }

  update(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let unitid = this.httpClient.post(this.url +'update/'+id,{headers : httpHeader});
    return unitid;
  }
  updateUnit(data) : Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let unitdata = this.httpClient.post(this.url+'updateData',data,{headers :httpHeader});
    return unitdata;
  }
}
