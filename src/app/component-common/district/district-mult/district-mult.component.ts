import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {ModalDirective} from "ngx-bootstrap";

import {HttpService} from "../../../service/http.service";
import {City} from "../../../component-admin/user-manage/city.model";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-district-mult',
  templateUrl: './district-mult.component.html',
  styleUrls: ['../district.component.scss']
})
export class DistrictMultComponent implements OnInit {

  @ViewChild('districtModal') districtModal: ModalDirective;   // 模态框

  @Input() ifResult: boolean;       // true:显示选择结果 2:不显示
  @Input() cityList: City[];        // 城市对象列表
  @Input() citys: number[];         // 城市code列表

  @Output() citysChange = new EventEmitter();        // 输出城市code列表

  districts: Array<object>;

  constructor(private http: HttpService, private cookie: CookieService) {
    this.cityList = [];
  }

  ngOnInit() {
    /*this.http.get('districts', {parentId: 0}, (data) => {
      this.districts = data;
    })*/
    // this.districts = JSON.parse(this.cookie.get('userDetail')).districts;
    this.districts = [{
      "alpha": "A",
      "list": [{"code": 34, "name": "安徽", "hot": 0, "status": 1, "alphabet": "A"}, {
        "code": 82,
        "name": "澳门",
        "hot": 0,
        "status": 1,
        "alphabet": "A"
      }]
    }, {"alpha": "B", "list": [{"code": 11, "name": "北京", "hot": 0, "status": 1, "alphabet": "B"}]}];

  }

  check(obj) {
    if (obj.active) {
      obj.active = false;
      let i = this.cityList.findIndex(v => v.code === obj.code);
      this.cityList.splice(i, 1);
      let m = this.citys.findIndex(v => v === obj.code);
      this.citys.splice(m, 1);
    } else {
      if (this.cityList.length < 10) {
        obj.active = true;
        this.cityList.push(obj);
        this.citys.push(obj.code);
      } else {
        alert('服务区域最多10个！');
      }
    }
  }

  // 删除
  del(i): void {
    this.cityList[i].active = false;
    this.cityList.splice(i, 1);
    this.citys.splice(i, 1);
  }

  certain() {
    this.citysChange.emit(this.citys);
    this.districtModal.hide();
  }

}
