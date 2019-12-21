import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShiftMasterService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  insertShiftMaster(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    console.log(data);
   let insertshift = this.httpClient.post(this.url + 'insertShiftData',data,{headers : httpHeader});
   return insertshift;
  }

  getShiftMaster():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getShift = this.httpClient.get(this.url+'getShiftMaster',{headers : httpHeader});
    return getShift;
  }

  deleteShift(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getShift = this.httpClient.get(this.url+'deleteShiftMaster/'+id,{headers : httpHeader});
    return getShift;
  }

  editShiftData(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let editShift = this.httpClient.get(this.url+'editShiftMaster/'+id,{headers : httpHeader});
    return editShift;
  }

  updateShiftMaster(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let updateShift = this.httpClient.post(this.url+'updateShiftMaster',data,{headers : httpHeader});
    return updateShift;
  }
}
