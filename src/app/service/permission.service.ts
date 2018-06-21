import { Injectable } from '@angular/core';
import { HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public http:HttpService) { }

  getPermission( parentCode:any, page:number,pageSize:number, callback:Function){
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
