import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(public httpService:HttpService) { }

  getVCode(mobile:any,callback:Function){
    let param = {"mobile":mobile, "purpose": "REGISTRY"};
    return this.httpService.httpPostNoToken("vcode/send_sms",param, (data) => {
      callback(data);
      });
  }
}
