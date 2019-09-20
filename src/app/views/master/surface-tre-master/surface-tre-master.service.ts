import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SurfaceTreMasterService {

  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  getSurfaceData():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

   let insertuint = this.httpClient.get(this.url + 'getSurfaceData',{headers : httpHeader});
   return insertuint;
  }

  submitData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.post(this.url+'SubmitData',data,{headers :httpHeader});
    return result;
  }

  deleteSurface(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url +'deleteSurface/'+id,{headers : httpHeader});
    return result;
  }

  editSurface(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.get(this.url + 'editSurface/'+id,{headers : httpHeader});
    return result;
  }

  updateData(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let result = this.httpClient.post(this.url+'UpdateSurface',data,{headers :httpHeader});
    return result;
  }
}
