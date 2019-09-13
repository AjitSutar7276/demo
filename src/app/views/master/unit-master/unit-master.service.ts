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
}
