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
  //当前城市
  currentCity;
  //当前用户服务区域
  districts = [];

  constructor(private router: Router, private cookie: CookieService, private http: HttpService, private tip: TipPopService, private common: CommonService) {
  }

  ngOnInit() {
    this.login = this.cookie.get('Authorization') ? true : false;
    this.common.getUserDetail(data => {
      this.userDetail = data;
      this.personUrl = (data.photo && data.photo.url) ? data.photo.url : '';
      localStorage.setItem('permitDistrict', JSON.stringify(data.districts));
      let citys = (data.districts && data.districts.length) ? data.districts : [{code: 4403, name: "深圳", hot: 0, status: 1, alphabet: "S"}];
      this.districts = this.handle(citys);
    });
    this.common.getUserPermission(data => {
      this.permission = data;
    });
    this.common.getCurrentCity(data => {
      this.currentCity = data;
    })
  }

  //是否显示侧边栏
  show() {
    this.showSiderbar = !this.showSiderbar;
  }

  //退出登录
  logout() {
    this.http.post('user/logout', '', data => {
      this.tip.setValue('退出登录成功！');
      this.router.navigateByUrl('/login');
      this.cookie.deleteAll();
      localStorage.removeItem('permitDistrict');
    });
  }

  //处理数据
  handle(arr){
    if(!arr){
      return [];
    }
    arr = arr.filter(v => v.code.toString().length == 4);
    let alphArr = [];
    arr.forEach(v => {
      if(alphArr.indexOf(v.alphabet) == -1) {
        alphArr.push(v.alphabet);
      }
    })
    let newArr = alphArr.map(v => {
      let a = arr.filter(w => {
        return w["alphabet"] == v;
      })
      return {"alpha": v, list: a};
    });
    return newArr;
  }

  //切换城市
  cityBox = false;
  chooseCity(item) {
    this.cookie.set('currentCity', JSON.stringify(item));
    this.cityBox = true;
    window.location.reload();
  }

}
