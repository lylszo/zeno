import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../../service/http.service';
import { TipPopService } from '../../service/tipPop.service';

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

  constructor(private router:Router, private cookie:CookieService, private http: HttpService, private tip:TipPopService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(this.cookie.get("userDetail"));
  }

  //是否显示侧边栏
  show(){
  	this.showSiderbar = !this.showSiderbar;
  }

  //退出登录
  logout() {
    this.http.post('user/logout', '', data => {
      this.cookie.delete("Authorization");
      this.cookie.delete("userDetail");
      this.tip.setValue('退出登录成功！', true);
      window.location.reload();
      this.router.navigateByUrl('/loginAdmin');
    })
  }

}
