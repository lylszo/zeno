import { Injectable } from '@angular/core';
import { HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public http:HttpService) { }

  getPermission(page:number,pageSize:number, callback:Function, parentCode?:any){
    let params = {
      parentCode:parentCode,
      page:page,
      pageSize:pageSize
    };
    return this.http.httpGet("permission",params, (data) => {
      callback(data)
    })
  }
}
