import {Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
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

  constructor(public userService:UserService,public smsService: SmsService,private renderer:Renderer2) {
    this.renderer.addClass(document.body, 'bg');
  }

  getVC() {
    this.smsService.getVCode(this.account, (data) => {
      console.log("mydata", data)
    })
  }

  ForgetSubmit(){
    if(this.password1!=this.password2){
      alert("密码不对应")
    } else {
      let userRegisterParam = {
        mobile:this.account,
        password:this.password1,
        vcode:this.code,
        // city:this.city
      };
      this.userService.register(userRegisterParam,(data) => {
        console.log("register",data)
      })
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'bg');
  }

}
