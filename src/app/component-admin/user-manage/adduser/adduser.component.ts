import {Component, OnInit} from '@angular/core';

// 服务
import {HttpService} from "../../../service/http.service";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  email: string;
  mobile: string;
  name: string;
  roles: number[];
  tags: number[];

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.getCityList()
  }


  // 工作城市
  cityList = [{
    code: -1,
    name: '全国'
  }];
  city = -1;

  getCityList() {
    let cityParams = {
      Authorization: this.http.auth,
      parent_id: 0
    };

    this.http.httpGet('district', cityParams, (data) => {
      this.cityList = this.cityList.concat(data);
    })
  }

  // 添加用户http
  submit() {
    interface UserParam {
      email?: string,
      mobile: string,
      name: string,
      roles?: Array<number>,
      tags?: Array<number>,
      working_city: number
    }

    let user: UserParam = {
      mobile: this.mobile,
      name: this.name,
      working_city: this.city
    };
    /*let params = {
      Authorization: this.http.auth,
      userCreateParam: user
    };*/

    this.http.httpPost('user', user, (data) => {
      console.log(data)
    })
  }


}
