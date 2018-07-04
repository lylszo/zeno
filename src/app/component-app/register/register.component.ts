import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  name: string = '';
  account: string = '';
  code: string = '';
  city: object = {'code': 0, 'name': ''};
  password1: string = '';
  password2: string = '';

  clicked: boolean = false;
  showCityPanel: boolean = false;
  time: any = '获取验证码';
  text: string = '获取验证码';
  disable:boolean = false;

  constructor(private http: HttpService, public router: Router) {
  }

  registerSubmit(invalid) {
    this.clicked = true;
    if (invalid) {
      this.disable = true;
      return;
    } else {
      this.disable = false;
      let userRegisterParam = {
        mobile: this.account,
        name: this.name,
        password: this.password1,
        vcode: this.code,
        workCity: this.city['code']
      };
      this.http._post('user/register', userRegisterParam, (data) => {
        this.router.navigateByUrl('/login');
      });
    }

  }

  // 从choose-ciy组件获取选中的城市
  getThisCity(event) {
    this.city = event;
    this.showCityPanel = !this.showCityPanel;
  }

  openPanel() {
    this.showCityPanel = !this.showCityPanel;
  }

  getVC(invalid) {
    if (invalid) {
      alert('请输入正确手机号码');
    } else {
      let params = {
        'mobile': this.account,
        'purpose': 'REGISTER'
      };
      this.http._post('vcode/send_sms', params, (data) => {
        this.code = data;
      });
      this.time = 60;
      let timer = setInterval(() => {
        this.time = this.time - 1;
        if (this.time === -1) {
          clearInterval(timer);
          this.time = '再次获取验证码';
        }
      }, 1000);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
