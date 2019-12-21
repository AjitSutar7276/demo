import { Injectable } from '@angular/core';
import { Headers,Http,HttpModule} from '@angular/http';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { config} from '../../../common/ServerConfig';
import { Observable} from 'rxjs';
import { map,retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeMasterService {
  private url : string = config.url;
  constructor(private httpClient : HttpClient) { }

  insertEmployee(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    console.log(data);
   let insertuint = this.httpClient.post(this.url + 'insertEmployee',data,{headers : httpHeader});
   return insertuint;
  }

  getEmployeeData():Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let getData = this.httpClient.get(this.url + 'getEmployeeData',{headers : httpHeader});
    return getData;
  }

  deleteEmployeeData(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let deleteData = this.httpClient.get(this.url + 'deleteEmployee/'+id,{headers:httpHeader});
    return deleteData;
  }

  EditEmployeeData(id):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let editData = this.httpClient.get(this.url +'getEmployeeDataEdit/'+id,{headers : httpHeader});
    return editData;
  }

  updateEmployee(data):Observable<any>{
    const httpHeader = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let updateData = this.httpClient.post(this.url +'updateEmployeeData',data,{headers : httpHeader});
    return updateData;
  }

}
