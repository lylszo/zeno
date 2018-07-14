import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpService } from "../../service/http.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  disable:boolean = false;
  constructor(private http:HttpService, public router:Router, public cookie:CookieService) {
  }

  ngOnInit() {

  }
  ngOnDestroy(){
  }


  loginIn(invalid){
    this.clicked=true;
    if(invalid){
      this.disable = true;
      return
    }else{
      this.disable = false;
      let param = {
        mobile:this.account,
        password:this.password
      };
      this.http._post("user/login", param, (data) => {
        let time = 24*60*60*1000;  // 设置24小时
        let timer = new Date(new Date().getTime() + time);
        this.cookie.set("Authorization", "Bearer " + data.token, timer);  // 登录的时候将token保存在cookie里面

        if(this.router.url==="/login"){
          this.router.navigate(['/user']);
        }else{
          this.router.navigate(['/admin']);
        }

        this.http.get('user/permissions', '', data => {
          let permitObj = {};
          if (data && data.length) {
            data.forEach(value => {
              permitObj[value] = '1';
            });
          }
          this.cookie.set('permit', JSON.stringify(permitObj));
        });
      })
    }
  }

}
