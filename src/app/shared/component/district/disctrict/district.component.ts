import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {City} from "../../../component-app/user-manage/city.model";
import {HttpService} from "../../../service/http.service";

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['../district.component.scss']
})
export class DistrictComponent implements OnInit {

  @Input() checkedCode: number;
  @Input() checkedItem: City;
  @Output() checkedCodeChange = new EventEmitter();
  @Output() checkedItemChange = new EventEmitter();

  cookieDistricts: Array<object>;
  showContent: false;

  constructor(private http: HttpService) {
    this.cookieDistricts = this.handle(JSON.parse(localStorage.getItem('permitDistrict')));
    if (!this.cookieDistricts) {
      this.http.get('user/0', '', (data) => {
        if (data.districts) {
          this.cookieDistricts = this.handle(data.districts);
          localStorage.setItem('permitDistrict', JSON.stringify(data.districts));
        }
      });
    }
  }

  ngOnInit() {
    this.checkedCode = -1;
    if (!this.checkedItem) {
      this.checkedItem = {
        name: '-请选择-',
        code: -1
      };
    } else {
      this.checkedCode = this.checkedItem.code;
    }

  }

  check(obj) {
    if (this.checkedItem.name === obj.name) {
      this.checkedItem = {
        name: '-请选择-',
        code: -1
      };
      this.checkedCode = -1;
    } else {
      this.checkedItem = {
        name: obj.name,
        code: obj.code
      };
      this.checkedCode = obj.code;
    }
    this.checkedCodeChange.emit(this.checkedCode);
    this.checkedItemChange.emit(this.checkedItem);
    this.showContent = false;
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
}
