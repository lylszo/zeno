import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {config} from '../config/config';
import {TipPopService} from './tipPop.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  bathUrl: string = 'http://zeno.xwkj.local:9005/openapi/';
  // bathUrl: string = 'http://zeno-api.xw18.cn/openapi/';
  url: string = this.bathUrl;
  auth: any;
  headers: any;
  picHeaders: any;
  error = {
    showError: false,
    errorText: '',
  };

  constructor(public http: HttpClient, private cookie: CookieService, public errorModel: TipPopService, private router:Router) {

  }

  // 设置header
  setHeader() {
    this.auth = this.cookie.get('Authorization');
    this.headers = new HttpHeaders({'Authorization': this.auth, 'Content-Type': 'application/json;charset=UTF-8'});
    this.picHeaders = new HttpHeaders({'Authorization': this.auth})
  }

  //错误处理
  handleError(error) {
    this.error.errorText = error.error ? error.error.message : `${error.status}：服务器繁忙，请稍后重试！`;
    this.errorModel.setValue(this.error.errorText, true);
    if(error.error.code==="1002"){
      this.router.navigate(['/login']);
    }
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
          //   this.error.errorText = data.message;
          //   console.log("接口返回错误码:", data);
          // }
          callback(data);
        },
        (error) => {
          this.handleError(error);
          if (err) {
            err(error.error);
          }
        });
  }

  // 不需要token的post请求
  _post(path: string, param: any, callback: Function, err?: Function) {
    this.url = this.bathUrl + path;
    return this.http.post(this.url, param)
      .subscribe((data: any) => {
          callback(data);
        },
        (error) => {
          this.handleError(error);
          if (err) {
            err(error.error);
          }
        });
  }

  // 上传图片
  picPost(path: string, param: any, callback: Function, err?: Function) {
    this.setHeader();
    this.url = this.bathUrl + path;
    return this.http.post(this.url, param, {headers: this.picHeaders})
      .subscribe((data: any) => {
          callback(data);
        },
        (error) => {
          this.handleError(error);
          if (err) {
            err(error.error);
          }
        });
  }

  // 需要token的get请求
  get(path: string, param: any, callback: Function, err?: Function) {
    this.setHeader();
    this.url = this.bathUrl + path;
    return this.http.get(this.url, {params: param, headers: this.headers})
      .subscribe((data) => {
          callback(data);
        },
        (error) => {
          this.handleError(error);
          if (err) {
            err(error.error);
          }
        });
  }

  // 不需要header的get请求
  _get(path: string, param: any, callback: Function, err?: Function) {
    this.url = this.bathUrl + path;
    return this.http.get(this.url, {params: param})
      .subscribe((data: any) => {
          callback(data);
        },
        (error) => {
          this.handleError(error);
          if (err) {
            err(error.error);
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
          this.handleError(error);
          if (err) {
            err(error.error);
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
          this.handleError(error);
          if (err) {
            err(error.error);
          }
        });
  }

}
