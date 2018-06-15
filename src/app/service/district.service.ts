import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(public http:HttpService) { }

  getDistrict(parent_id:string, callback:Function) {
    let param:any = {
      "parent_id":parent_id
    };
    return this.http.httpGetNoToken("district", param, (data) => {
      callback(data)
    })
  }

}
