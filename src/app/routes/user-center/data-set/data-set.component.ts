import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import {CommonService} from "../../../shared/service/common.service";
import {TipPopService} from "../../../shared/service/tipPop.service";
import {CookieService} from "ngx-cookie-service";
import {City} from "../../user-manage/user-manage/city.model";
import {Photo} from "../../../component/previewimg/photo.model";
import {isUndefined} from "util";

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss']
})
export class DataSetComponent implements OnInit {

  oldPhoto: Photo[] = [];
  photo: Photo[] = [];   // 头像

  // 用户姓名
  oldName: string;
  name: string;

  // 手机号
  mobile: string;

  // 城市
  oldCity: City;
  city: City = {code: 0, name: ''};
  showCityPanel: Boolean = false;

  constructor(private http: HttpService, private common: CommonService,
              private tip: TipPopService, private cookie: CookieService,
              private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.common.getUserDetail((data) => {
      this.name = this.oldName = data.name;
      this.city = this.oldCity = data.workingCity;
      this.mobile = data.mobile;
      let arr:any = [];
      arr.push(data.photo);
      if (data.photo) {
        this.photo = arr;
        this.oldPhoto = [];
      } else {
        this.photo = [];
        this.oldPhoto = [];
      }
    })
  }

  // 从choose-ciy组件获取选中的城市
  getThisCity(event) {
    this.city = event;
    this.showCityPanel = !this.showCityPanel;
  }

  openPanel() {
    this.showCityPanel = !this.showCityPanel;
  }


  // 修改提交
  submit() {
    if (this.name !== this.oldName || this.city.code !== this.oldCity.code || this.photo != this.oldPhoto) {
      let param: any = {
        name: this.name,
        workingCityId: this.city.code
      };
      this.photo.length > 0 ? param.photoId = this.photo[0].id : isUndefined(param.photoId);
      this.http.post('user/myself', param, () => {
        this.tip.setValue('修改成功', false);
        this.http.get('user/0', '', data => {
          this.cookie.set('userDetail', JSON.stringify(data));
          window.location.reload();
        })
      })
    } else {
      this.tip.setValue('请修改后再提交', true);
    }

  }

  goChangePhone(): void {
    this.router.navigateByUrl('/person/changePhone');
  }

}
