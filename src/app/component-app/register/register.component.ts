import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SmsService } from '../../service/sms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss'],
  providers:[UserService, SmsService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  name:string = "";
  account:string = '';
  code:string = '';
  city:string = '';
  password1:string = '';
  password2:string = '';

  showCityPanel:boolean = false;

  constructor(public userService:UserService,public smsService: SmsService,private renderer:Renderer2) {
    this.renderer.addClass(document.body, 'bg');
  }

  registerSubmit(){
    if(this.password1!=this.password2){
      alert("密码不对应")
    } else {
      let userRegisterParam = {
        mobile:this.account,
        name:this.name,
        password:this.password1,
        vcode:this.code,
        // city:this.city
      };
      this.userService.register(userRegisterParam,(data) => {
        console.log("register",data)
      })
    }

  }

  // 从choose-ciy组件获取选中的城市
  getThisCity(event){
    this.city = event;
    console.log(this.city,'city');
    this.showCityPanel = !this.showCityPanel
  }

  openPanel(){
    this.showCityPanel = !this.showCityPanel;
    console.log(this.showCityPanel,'222')
  }

  getVC() {
    this.smsService.getVCode(this.account, (data) => {
      console.log("mydata", data)
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'bg');
  }
}
