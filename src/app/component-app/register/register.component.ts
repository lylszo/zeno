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

  clicked:boolean=false;
  showCityPanel:boolean = false;
  time:any="获取验证码";
  text:string="获取验证码";

  constructor(public userService:UserService,public smsService: SmsService,private renderer:Renderer2) {
    this.renderer.addClass(document.body, 'bg');
  }

  registerSubmit(invalid){
    this.clicked=true;
    if(this.password1!=this.password2){
      alert("密码不对应")
    }else if(invalid){
      alert("参数填写错误")
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

  getVC(invalid) {
    if(invalid){
      alert("请输入正确手机号码");
    }else{
      this.smsService.getVCode(this.account, "REGISTER",(data) => {
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

  ngOnInit() {
  }

  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'bg');
  }
}
