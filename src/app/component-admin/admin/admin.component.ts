import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from '../../service/http.service';
import {TipPopService} from '../../service/tipPop.service';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //是否显示侧边栏
  showSiderbar: boolean = true;
  //用户信息
  userDetail: any;
  //是否登录
  login: boolean = false;
  //权限
  permission: any = {};
  //用户头像
  personUrl;

  constructor(private router: Router, private cookie: CookieService, private http: HttpService, private tip: TipPopService, private common: CommonService) {
  }

  ngOnInit() {
    this.login = this.cookie.get('Authorization') ? true : false;
    this.common.getUserDetail(data => {
      this.userDetail = data;
      this.personUrl = (data.photo && data.photo.url) ? data.photo.url : '';
    });

    this.common.getUserPermission(data => {
      this.permission = data;
    });
  }

  //是否显示侧边栏
  show() {
    this.showSiderbar = !this.showSiderbar;
  }

  //退出登录
  logout() {
    this.http.post('user/logout', '', data => {
      this.tip.setValue('退出登录成功！');
      this.router.navigateByUrl('/loginAdmin');
      this.cookie.deleteAll();
    });
  }

}
