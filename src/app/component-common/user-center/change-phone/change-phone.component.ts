import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {HttpService} from "../../../service/http.service";
import {TipPopService} from "../../../service/tipPop.service";
import {Router, RouterStateSnapshot} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.scss']
})
export class ChangePhoneComponent implements OnInit {

  mobile: String = '';
  bindMobile: String = '';
  code: String = '';
  bindCode: String = '';
  loseBindFlag = false;

  constructor(private common: CommonService, private http: HttpService,
              private tip: TipPopService, private cookie: CookieService,
              private router: Router) {

  }

  ngOnInit() {
    this.common.getUserDetail((data) => {
      this.mobile = data.mobile;
    })
  }

  codeCheck: String = '';

  getCode(step) {
    if (step === 2 && !this.bindMobile) {
      this.tip.setValue('请输入手机号', true);
    } else {
      let param = {
        mobile: step === 1 ? this.mobile : this.bindMobile,
        purpose: 'SET_MOBILE'
      };
      this.http.post('vcode/send_sms', param, (data) => {
        this.codeCheck = data;
      })
    }
  }

  // 解绑
  loseBind() {
    this.loseBindFlag = true;
  }

  bind() {
    if (this.bindMobile != this.mobile) {
      let param = {
        mobile: this.bindMobile,
        oldVcode: this.code,
        vcode: this.bindCode
      };
      this.http.put('user/setMobile', param, () => {
        this.tip.setValue('绑定成功', false);
        this.http.get('user/0', '', data => {
          this.cookie.set('userDetail', JSON.stringify(data));
          this.router.navigateByUrl('/admin/dataSet');
        })
      }, (err) => {
        if (err.code == '3021') {
          this.tip.setValue('解绑验证码输入错误，请重新输入', true);
          this.loseBindFlag = false;
          this.code = '';
        } else if (err.code == '3001') {
          this.tip.setValue('验证码错误，请重新输入', true);
          this.bindCode = '';
        }
      })
    } else {
      this.tip.setValue("此号码已绑定", true);
    }
  }

}
