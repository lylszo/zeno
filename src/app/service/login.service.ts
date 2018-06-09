import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpService:HttpService){}

  login(params:any,callback:Function) {
    return this.httpService.httpPost("user_login", params,
      (data) => {
      callback(data);
      });
  }
  getData(){
    return this.httpService.httpGet("../../assets/data.json")
  }
}
