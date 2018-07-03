import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  //是否登录
  login: boolean;
  //用户详情
  userDetail: any;

  constructor(private cookie: CookieService) { }

  ngOnInit() {
    this.login = this.cookie.get("Authorization") ? true : false;
    let detail = this.cookie.get("userDetail");
    this.userDetail = detail ? JSON.parse(this.cookie.get("userDetail")) : {};
  }

}
