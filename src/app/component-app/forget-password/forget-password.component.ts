import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../login/login.component.scss', './forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  account:string = '';
  code:string = '';
  password1:string = '';
  password2:string = '';

  clicked:boolean=false;
  time:any="获取验证码";
  disable:boolean = false;

  constructor(private http:HttpService, public router:Router) {
  }

  getVC(invalid) {
    if(invalid){
      alert("请输入正确手机号码");
    }else{
      let params = {
        "mobile": this.account,
        "purpose": "RESETPWD"
      };
      this.http._post("vcode/send_sms", params, (data) => {
        this.code=data;
      });
      this.time=60;
      let timer = setInterval(() => {
        this.time = this.time - 1;
        if(this.time === -1){
          clearInterval(timer);
          this.time="再次获取验证码"
        }
      }, 1000);
    }
  }

  ForgetSubmit(invalid){
    this.clicked=true;
    if(invalid){
      this.disable = true;
      return
    } else{
      this.disable = false;
      let userResetPasswordParam = {
        mobile:this.account,
        newPassword:this.password1,
        repeatPassword:this.password2,
        vcode:this.code
      };
      this.http._post("user/resetPassword", userResetPasswordParam, (data) => {
        this.router.navigateByUrl('/login');
      })
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
