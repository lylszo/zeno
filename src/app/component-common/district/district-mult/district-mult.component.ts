import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {ModalDirective} from "ngx-bootstrap";

import {HttpService} from "../../../service/http.service";
import {City} from "../../../component-admin/user-manage/city.model";
import {CommonService} from '../../../service/common.service';
import {TipPopService} from "../../../service/tipPop.service";

@Component({
  selector: 'app-district-mult',
  templateUrl: './district-mult.component.html',
  styleUrls: ['../district.component.scss']
})
export class DistrictMultComponent implements OnInit {

  @ViewChild('districtModal') districtModal: ModalDirective;   // 模态框
  // isModalShown: Boolean = false;

  @Input() ifResult: boolean;       // true:显示选择结果 2:不显示
  @Input() cityList: any[];        // 城市对象列表
  @Input() citys: number[];         // 城市code列表

  @Output() citysChange = new EventEmitter();        // 输出城市code列表
  @Output() dealChecked = new EventEmitter();        // 函数暴露，再父组件中处理选中值

  // originCityList: City[];
  districts: Array<any>;
  cookieDistricts: Array<any>;

  constructor(private http: HttpService, private common: CommonService, private tip: TipPopService) {
    if (!this.cookieDistricts) {
      this.common.getUserDetail((data) => {
        if (data.districts) {
          this.cookieDistricts = data.districts;
        }
      })
    }
  }

  ngOnInit() {
    // this.originCityList = this.cityList ? this.cityList : [];
    this.cityList = this.cityList ? this.cityList : [];
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
        this.tip.setValue('服务区域最多10个！', true);
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
    this.dealChecked.emit();
    this.hideModal();
  }

  // 处理数据
  handle(arr) {
    if (!arr) {
      return [];
    }
    let alphArr = [];
    arr.forEach(v => {
      if (alphArr.indexOf(v.alphabet) == -1) {
        alphArr.push(v.alphabet);
      }
    });
    let newArr = alphArr.map(v => {
      let a = arr.filter(w => {
        return w["alphabet"] == v;
      });
      return {"alpha": v, list: a};
    });
    return newArr;
  }

  // 模态框
  showModal(): void {
    let that = this;
    that.districtModal.show();
    if (that.cityList) {
      that.cityList.forEach((v) => {
        if (JSON.stringify(v) != 'null') {
          let i = that.cookieDistricts.findIndex(d => d.code === v.code);
          if (i >= 0) {
            that.cookieDistricts[i].active = true;
          }
        }
      })
    } else {
      that.cityList = [];
    }
    that.districts = this.handle(that.cookieDistricts);
  }

  hideModal(): void {
    this.districtModal.hide();
  }
}
