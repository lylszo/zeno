import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpService:HttpService){}

  register(params:any,callback:Function) {
    return this.httpService.httpPost("/user/register", params,
      (data) => {
        callback(data);
      });
  }
  login(params:any,callback:Function) {
    return this.httpService.httpPost("/user/login", params,
      (data) => {
        callback(data);
      });
  }
  getData(){
    return this.httpService.httpGet("../../assets/data.json")
  }
}
