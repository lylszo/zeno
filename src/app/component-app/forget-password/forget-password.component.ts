import {Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../service/user.service';
import { SmsService } from '../../service/sms.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../login/login.component.scss', './forget-password.component.scss'],
  providers:[UserService, SmsService]
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  account:string = '';
  code:string = '';
  password1:string = '';
  password2:string = '';

  clicked:boolean=false;
  time:any="获取验证码";

  constructor(public userService:UserService,public smsService: SmsService) {
  }

  getVC(invalid) {
    if(invalid){
      alert("请输入正确手机号码");
    }else{
      this.smsService.getVCode(this.account, "RESETPWD",(data) => {
        console.log("mydata", data);
      });
      this.time=60;
      let timer = setInterval(() => {
        this.time = this.time - 1;
        if(this.time === -1){
          clearInterval(timer);
          this.time="获取验证码"
        }
      }, 1000);
    }
  }

  ForgetSubmit(valid){
    this.clicked=true;
    if(!valid){
      alert("参数填写不正确")
    }else if(this.password1!=this.password2){
      alert("密码不对应")
    } else{
      let userResetPasswordParam = {
        mobile:this.account,
        password:this.password1,
        vcode:this.code,
        // city:this.city
      };
      this.userService.resetPassword(userResetPasswordParam,(data) => {
        console.log("forget",data)
      })
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
