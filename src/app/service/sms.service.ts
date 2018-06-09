import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(public httpService:HttpService) { }

  getVCode(mobile:any,callback:Function){
    return this.httpService.httpPost("vcode/send_sms",{mobile:mobile}, (data) => {
      callback(data);
      });
  }
}
