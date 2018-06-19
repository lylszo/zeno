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

  constructor(public userService:UserService,public smsService: SmsService) {
  }

  getVC() {
    this.smsService.getVCode(this.account, (data) => {
      console.log("mydata", data)
    })
  }

  ForgetSubmit(valid){
    this.clicked=true;
    if(!valid){
      return
    }else{
      let userRegisterParam = {
        mobile:this.account,
        password:this.password1,
        vcode:this.code,
        // city:this.city
      };
      this.userService.register(userRegisterParam,(data) => {
        console.log("forget",data)
      })
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
