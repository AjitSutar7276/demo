import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class OrderReportService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getPODetailsID(id):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url + 'getPODetailsDataids/'+id,{headers : httpHeader});
    return result;
  }
}
