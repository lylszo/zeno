import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpParams} from '@angular/common/http';
import {config} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = config.url;

  constructor(public http: HttpClient) {
  }

  httpPost(method: string, param: any, callback: Function) {
    // let params = new HttpParams().set("id",'0').set("jsonrpc","2.0")
    //   .set("method",method).set("params",param);
    let params = {
      id: 0,
      jsonrpc: "2.0",
      method: method,
      params: param
    };
    return this.http.post(this.url, params)
      .subscribe((data: any) => {
          console.log("http", data.result);
          if (data.result) {
            callback(data.result);
          } else {
            console.log("error accoued:", data.error);
          }
        },
        (error) => {
          console.log("httperror", error);
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
  httpGet(url: any, method?: any, param?: any) {
    let params = new HttpParams();
    params = params.append("id", '0');
    params = params.append("jsonrpc", "2.0");
    params = params.append("method", method);
    params = params.append("params", JSON.stringify(param));
    return this.http.get(url);
  }

  httpDelete(url: string) {
    return this.http.delete(url);
  }

  httpPut(url: string, params: any) {
    return this.http.put(url, params);
  }

}
