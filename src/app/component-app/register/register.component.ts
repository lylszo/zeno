import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SmsService } from '../../service/sms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss'],
  providers:[UserService, SmsService]
})
export class RegisterComponent implements OnInit {
  name:string = "";
  account:string = '';
  code:string = '';
  city:string = '';
  password1:string = '';
  password2:string = '';

  constructor(public userService:UserService,public smsService: SmsService,private renderer:Renderer2) {
    this.renderer.addClass(document.body, 'bg');
  }

  userRegister(){

  }

  getCode(){
    console.log(this.account);
    this.smsService.getVCode(this.account, (data) => {
      console.log(data)
    })
  }

  ngOnInit() {
  }

}
