import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from "../../../shared/service/http.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {TipPopService} from "../../../shared/service/tipPop.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  login: any;
  account: string;
  password: string;
  clicked: boolean = false;
  disable: boolean = false;
  permitObj: any = {};

  constructor(private http: HttpService, public router: Router, public cookie: CookieService, public tip: TipPopService) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }


  loginIn(invalid) {
    this.clicked = true;
    if (invalid) {
      this.disable = true;
      return
    } else {
      this.disable = false;
      let param = {
        mobile: this.account,
        password: this.password
      };
      this.http._post("user/login", param, (data) => {
        let time = 24 * 60 * 60 * 1000;  // 设置24小时
        let timer = new Date(new Date().getTime() + time);
        this.cookie.set("Authorization", "Bearer " + data.token, timer);  // 登录的时候将token保存在cookie里面
        this.router.navigate(['/home']);
        this.http.get('user/permissions', '', (permit) => {
          if (permit && permit.length) {
            permit.forEach(value => {
              value = value.trim();
              this.permitObj[value] = '1';
              let code = value.substr(0, 4);
              if (!this.permitObj[code]) {
                this.permitObj[code] = '1';
              }
            });
            this.cookie.set('permit', JSON.stringify(this.permitObj));
          }
        });
      })
    }
  }

}
