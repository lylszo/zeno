import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from "../../../shared/service/http.service";
import { Router } from '@angular/router';
import {TipPopService} from '../../../shared/service/tipPop.service';

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
  time:number=-1;
  text:string="请获取验证码";
  disable:boolean = false;

  constructor(private http:HttpService, public router:Router, private tip:TipPopService) {
  }

  getVC(invalid) {
    if(invalid){
      this.tip.setValue('请输入正确手机号码',true);
    }else{
      let params = {
        "mobile": this.account,
        "purpose": "RESETPWD"
      };
      this.http._post("vcode/send_sms", params, (data) => {
        if(data){
          this.code=data;
        }
      });
      this.time=60;
      let timer = setInterval(() => {
        this.time = this.time - 1;
        if(this.time === -1){
          clearInterval(timer);
          this.text="再次获取验证码"
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
        verifyCode:this.code
      };
      this.http._post("user/resetPassword", userResetPasswordParam, (data) => {
        this.tip.setValue("重置密码成功", false);
        this.router.navigateByUrl('/login');
      })
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
