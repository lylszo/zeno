import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../service/http.service";
import {CommonService} from "../../../service/common.service";
import {TipPopService} from "../../../service/tipPop.service";

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  oldPwd: String = '';
  newPwd: String = '';
  repeatPwd: String = '';

  constructor(private http: HttpService, private common: CommonService, private tip: TipPopService) {
  }

  ngOnInit() {}

  submit() {
    let param = {
      password: this.oldPwd,
      new_password: this.newPwd
    };
    this.http.post('user/setPassword', param, () => {
      this.tip.setValue('修改成功', false);
      window.location.reload();
    })
  }

}
