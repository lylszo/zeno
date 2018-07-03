import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpService } from "../../service/http.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  login:any;
  account:string;
  password:string;
  clicked:boolean=false;
  path:string;
  constructor(private http:HttpService, public router:Router, public cookie:CookieService, private locate:Location) {
    this.path = this.locate.path();  // 获取当前的url的path部分
  }

  ngOnInit() {

  }
  ngOnDestroy(){
  }


  loginIn(invalid){
    this.clicked=true;
    if(invalid){
      return
    }else{
      let param = {
        mobile:this.account,
        password:this.password
      };
      this.http._post("user/login", param, (data) => {
        let time = 24*60*60*1000;  // 设置24小时
        let timer = new Date(new Date().getTime() + time);
        this.cookie.set("Authorization", "Bearer " + data.token, timer);  // 登录的时候将token保存在cookie里面
        this.http.get("user/" + 0, '', (data) => {
          if(data) {
            this.cookie.set("userDetail", JSON.stringify(data), timer);
          }

          //获取当前城市放入localStorage
          let currentCity = {code: 4403, name: '深圳'};
          let myCity = new BMap.LocalCity();
          let districts = (data && data.districts) ? data.districts : [];
          myCity.get(rs => {
            let cityName = rs.name.replace('市', '');
            if(districts.length) {
              districts.forEach(v => {
                if(cityName == v.name){
                  currentCity = {code: v.code, name: v.name};
                }
              })
            }
            let currentCity = {code: 4401, name: '北京'};
            localStorage.setItem('currentCity', JSON.stringify(currentCity));
          
            if(this.path==="/login"){
              this.router.navigateByUrl('/user');
            }else{
              this.router.navigateByUrl('/admin');
            }
          });

        });
      })
    }
  }

}
