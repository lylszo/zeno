import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {City} from "../../../component-admin/user-manage/city.model";
import {CommonService} from "../../../service/common.service";

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['../district.component.scss']
})
export class DistrictComponent implements OnInit {

  @Input() checkedCode: number;
  @Input() checkedItem: City;
  @Output() checkedCodeChange = new EventEmitter();

  districts: Array<object>;
  showContent: false;
  checkedName: string;

  constructor(private common: CommonService) {
    if (!this.districts) {
      this.common.getUserDetail((data) => {
        if(data.districts){
          this.districts = this.handle(data.districts);
        }
      })
    }
  }

  ngOnInit() {
    this.checkedCode = -1;
    if (!this.checkedItem) {
      this.checkedItem = {
        name: '-请选择-',
        code: -1
      };
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
    this.showContent = false;
  }

  //处理数据
  handle(arr){
    if(!arr){
      return [];
    }
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
}
