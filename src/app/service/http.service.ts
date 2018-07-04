import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {config} from '../config/config';
import {TipPopService} from './tipPop.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  bathUrl: string = 'http://zeno.xwkj.local:9005/openapi/';
  url: string = this.bathUrl;
  auth: any;
  headers: any;
  error = {
    showError: false,
    errorText: '',
  };

  constructor(public http: HttpClient, private cookie: CookieService, public errorModel: TipPopService) {

  }

  // 设置header
  setHeader() {
    this.auth = this.cookie.get('Authorization');
    this.headers = new HttpHeaders({'Authorization': this.auth, 'Content-Type': 'application/json;charset=UTF-8'});
  }

  // 需要token的post请求
  post(path: string, param: any, callback: Function, err?: Function) {
    this.setHeader();
    this.url = this.bathUrl + path;
    // console.log(this.cookie.get("Authorization"));
    return this.http.post(this.url, param, {headers: this.headers})
      .subscribe((data: any) => {
          // if (data===null || data) {
          //   callback(data);
          // } else {
          //   this.error.showError = true;
          //   this.error.errorText = data.message;
          //   console.log("接口返回错误码:", data);
          // }
          callback(data);
        },
        (error) => {
          this.error.errorText = error.error.message;
          this.errorModel.setValue(this.error.errorText,false);
          if (err) {
            err();
          }
        });
  }

  // 不需要header的post接口
  _post(path: string, param: any, callback: Function, err?: Function) {
    this.url = this.bathUrl + path;
    return this.http.post(this.url, param)
      .subscribe((data: any) => {
          callback(data);
        },
        (error) => {
          this.error.showError = true;
          this.error.errorText = error.error.message;
          this.errorModel.setValue(this.error.errorText,false);
          if (err) {
            err();
          }
        });
  }

  get(path: string, param: any, callback: Function, err?: Function) {
    this.setHeader();
    this.url = this.bathUrl + path;
    return this.http.get(this.url, {params: param, headers: this.headers})
      .subscribe((data) => {
          callback(data);
        },
        (error) => {
          this.error.showError = true;
          this.error.errorText = error.error.message;
          this.errorModel.setValue(this.error.errorText,false);
          if (err) {
            err();
          }
        });
  }

  _get(path: string, param: any, callback: Function, err?: Function) {
    this.url = this.bathUrl + path;
    return this.http.get(this.url, {params: param})
      .subscribe((data: any) => {
          callback(data);
        },
        (error) => {
          this.error.showError = true;
          this.error.errorText = error.error.message;
          this.errorModel.setValue(this.error.errorText,false);
          if (err) {
            err();
          }
        });
  }

  del(path: string, callback: Function, param?: any, err?: Function) {
    this.setHeader();
    this.url = this.bathUrl + path;
    return this.http.delete(this.url, {params: param, headers: this.headers})
      .subscribe((data) => {
        callback(data)
      },
        (error) => {
          this.error.showError = true;
          this.error.errorText = error.error.message;
          this.errorModel.setValue(this.error.errorText,false);
          if (err) {
            err();
          }
        })
  }

  put(path: string, params: any, callback: Function, err?: Function) {
    this.setHeader();
    this.url = this.bathUrl + path;
    return this.http.put(this.url, params, {headers: this.headers})
      .subscribe((data) => {
          callback(data);
        },
        (error) => {
          this.error.showError = true;
          this.error.errorText = error.error.message;
          this.errorModel.setValue(this.error.errorText,false);
          if (err) {
            err();
          }
        });
  }

}
