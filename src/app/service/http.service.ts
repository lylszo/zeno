import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {config} from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // bathUrl:string = 'http://java-dev.xwkj.local:8881/';
  bathUrl:string = 'http://java-dev.xwkj.local:9005/openapi/';
  // bathUrl:string = 'http://192.168.0.35:9005/openapi/';
  url:string = this.bathUrl;
  auth:any;
  headers:any;

  constructor(public http: HttpClient, private cookie:CookieService) {
    this.auth = this.cookie.get("Authorization");
    this.headers = new HttpHeaders({"Authorization": this.auth});
  }
  // 需要token的post请求
  httpPost(path: string, param: any, callback: Function) {
    this.url = this.bathUrl + path;
    return this.http.post(this.url, param, {headers:this.headers})
      .subscribe((data: any) => {
          if (data) {
            callback(data);
          } else {
            console.log("接口返回错误码:", data);
          }
        },
        (error) => {
          console.log("http或服务器发生错误", error);
        });
  }
  // 不需要header的post接口
  httpPostNoToken(path: string, param: any, callback: Function) {
    this.url = this.bathUrl + path;
    return this.http.post(this.url, param)
      .subscribe((data: any) => {
          if (data) {
            callback(data);
          } else {
            console.log("接口返回错误码:", data);
          }
        },
        (error) => {
          console.log("http或服务器发生错误", error);
          console.log("body",param)
        });
  }

  // httpPost(method:any,param:any,callback:Function){
  //   // let params = new HttpParams().set("id",'0').set("jsonrpc","2.0")
  //   //   .set("method",method).set("params",param);
  //   let params = {
  //     id:0,
  //     jsonrpc:"2.0",
  //     method:method,
  //     params:param
  //   };
  //   return this.http
  //     .post(this.url, params)
  //     .toPromise()
  //     .then((data:any) => {
  //       callback(data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
  httpGet(path: string,  param: any, callback:Function) {
    console.log("header", this.headers);
    this.url = this.bathUrl + path;
    return this.http.get(this.url,{params: param, headers:this.headers})
      .subscribe((data) => {
        callback(data)
      },
        (error) => {
          console.log("http或服务器发生错误", error);
      });
  }

  httpGetNoToken(path: string, param: any, callback:Function) {
    this.url = this.bathUrl + path;
    return this.http.get(this.url,{params:param})
      .subscribe((data: any) => {
          if (data) {
            callback(data);
          } else {
            console.log("接口返回错误码:", data);
          }
        },
        (error) => {
          console.log("http或服务器发生错误", error);
        });
  }

  httpDelete(path: string) {
    this.url = this.bathUrl + path;
    return this.http.delete(this.url,{headers:this.headers});
  }

  httpPut(path: string, params: any) {
    this.url = this.bathUrl + path;
    return this.http.put(this.url, params,{headers:this.headers});
  }

}
