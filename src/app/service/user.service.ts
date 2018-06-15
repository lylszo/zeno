import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpService:HttpService, public cookie:CookieService){}

  register(params:any,callback:Function) {
    return this.httpService.httpPost("user/register", params,
      (data) => {
        callback(data);
      });
  }
  login(params:any,callback:Function) {
    return this.httpService.httpPost("user/login", params,
      (data) => {
        this.cookie.set("Authorization", "Bearer " + data);  // 登录的时候将token保存在cookie里面
        callback(data);
      });
  }
  getData(){
    return this.httpService.httpGet("../../assets/data.json")
  }
}
