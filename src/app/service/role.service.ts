import { Injectable } from '@angular/core';
import { HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpService) { }

  getRole(id:number, name:any,page:number, pageSize:number, callback:Function){
    let params = {
      id:id,
      name:name,
      page:page,
      pageSize:pageSize
    };
    return this.http.httpGet("role", params, (data)=>{
      callback(data)
    })
  }

  createRole(name:string,permissions:any, callback:Function){
    let roleInfoParam = {
      name: name,
      permissions: permissions
    };
    return this.http.httpPost("role", roleInfoParam,(data)=>{
      callback(data)
    })
  }

  updateRole(id:number, name:string, permissions:any, callback:Function){
    let roleInfoParam = {
      name:name,
      permissions:permissions
    };
    return this.http.httpPut("role/" + id, roleInfoParam, (data) => {
      callback(data)
    })
  }


}
