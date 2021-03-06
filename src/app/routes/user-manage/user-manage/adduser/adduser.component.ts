import {Component, OnInit} from '@angular/core';

// 服务
import {HttpService} from '../../../../shared/service/http.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import {TipPopService} from '../../../../shared/service/tipPop.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  email: string;
  mobile: string;
  userName: string;
  roles = [];
  tags = [];
  city = -1;    // 工作城市
  citys = [];   // 可服务区域

  constructor(private http: HttpService, private router: Router, private tip: TipPopService) {
  }

  ngOnInit() {
  }

  getRole(event) {
    this.roles = [];
    if(event.roleId){
      this.roles.push(event.roleId);
    }
  }

  // 添加用户http
  submit() {
    interface UserParam {
      email?: string,
      mobile: string,
      name: string,
      roles?: Array<number>,
      tags?: Array<number>,
      workingCityId: number,
      districts?: Array<number>;
    }

    let user: UserParam = {
      mobile: this.mobile,
      name: this.userName,
      workingCityId: this.city,
    };

    this.email ? user.email = this.email : isUndefined(user.email);
    this.tags.length > 0 ? user.tags = this.tags : isUndefined(user.tags);
    this.roles.length && this.roles[0] > 0 ? user.roles = this.roles : isUndefined(user.roles);
    this.citys.length > 0 ? user.districts = this.citys : isUndefined(user.districts);


    this.http.post('user', user, (data) => {
      this.tip.setValue('创建成功', false);
      history.back();
    });
  }


}
