import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class PartyMasterService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  submit(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    let result = this.httpClient.post(this.url+'submitPartyData',data,{headers : httpHeader});
    return result;
  }

  getPartyData():Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url + 'getPartyData',{headers : httpHeader});
    return result;
  }

  editPartyData(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'editPartyData/'+id,{headers:httpHeader});
    return result;
  }

  deletePartyData(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url+'deletePartyData/'+id,{headers : httpHeader});
    return result;
  }
}
