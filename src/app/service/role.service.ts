import { Injectable } from '@angular/core';
import { HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpService) { }

  getRole(page:number, pageSize:number, callback:Function, id?:any, name?:any){
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
}
