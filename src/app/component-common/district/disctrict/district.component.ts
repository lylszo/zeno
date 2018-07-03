import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {HttpService} from "../../../service/http.service";
import {City} from "../../../component-admin/user-manage/city.model";
import {CookieService} from "ngx-cookie-service";

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

  constructor(private http: HttpService, private cookie: CookieService) {
  }

  ngOnInit() {
    this.checkedCode = -1;
    this.checkedItem = {
      name: '-请选择-',
      code: -1
    };
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
}
