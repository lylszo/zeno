import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpService, private cookie: CookieService) {

  }

  //获取当前用户详情,未登录返回{}
  getUserDetail(callback) {
    if (this.cookie.get('Authorization')) {
      this.http.get('user/0', '', data => {
        callback(data);
      });
    } else {
      callback({});
    }
  }

  //获取当前用户权限
  getUserPermission(callback) {
    if (this.cookie.get('Authorization')) {
      let permitData = this.cookie.get('permit');
      if (permitData && permitData != "{}") {
        let permitObj = JSON.parse(permitData);
        callback(permitObj);
      } else {
        this.http.get('user/permissions', '', data => {
          let permitObj = {};
          if (data && data.length) {
            data.forEach(value => {
              permitObj[value] = '1';
              let code = value.substr(0,4);
              if(!permitObj[code]){
                permitObj[code] = '1';
              }
            });
          }
          callback(permitObj);
          this.cookie.set('permit', JSON.stringify(permitObj));
        });
      }
    }else{
      callback({});
    }
  }

  //获取当前城市
  //未登录暂时默认为深圳
  //登录后如果定位城市在当前用户的服务区域内就等于定位城市，如果定位城市不在服务区域内就等于服务区域城市列表的第一个城市，如果服务区域城市列表为空，则等于深圳
  getCurrentCity(callback) {
    if (!this.cookie.get('currentCity')) {
      if (this.cookie.get('Authorization')) {
        this.getUserDetail(data => {
          let districts = data.districts || [];
          let city = {code: 4403, name: "深圳", hot: 0, status: 1, alphabet: "S"};
          if (districts.length) {
            let myCity = new BMap.LocalCity();
            myCity.get(rs => {
              let cityName = rs.name.replace('市', '');
              let hasCurrent = false;
              districts.forEach(v => {

                if (v.name == cityName) {
                  hasCurrent = true;
                  city = v;
                }
              });
              if (hasCurrent) {
                callback(city);
                this.cookie.set('currentCity', JSON.stringify(city));
              } else {
                callback(districts[0]);
                this.cookie.set('currentCity', JSON.stringify(districts[0]));
              }
            });
          } else {
            callback(city);
            this.cookie.set('currentCity', JSON.stringify(city));
          }
        });
      } else {
        let city = {code: 4403, name: "深圳", hot: 0, status: 1, alphabet: "S"};
        callback(city);
      }
    } else {
      let city = JSON.parse(this.cookie.get('currentCity'));
      callback(city);
    }
  }


}
