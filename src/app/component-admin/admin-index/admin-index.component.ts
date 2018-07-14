import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from '../../service/http.service';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  // 是否登录
  login: boolean;
  // 用户详情
  userDetail: any;
  //团队列表
  teams:any;
  //权限
  permission: any;
  //用户头像
  personUrl;

  constructor(private cookie: CookieService, private http: HttpService,
              private common: CommonService) {
  }

  ngOnInit() {
    this.login = this.cookie.get("Authorization") ? true : false;
    this.common.getUserDetail(data => {
      this.userDetail = data;
      this.teams = data.teams || [];
      this.personUrl = (data.photo && data.photo.url) ? data.photo.url : '';
    });
    this.common.getUserPermission(data => {
      this.permission = data;
    });
    this.getMessage();
  }

  //查看更多team
  leftMargin = 0;//团队的margin-left值
  leftNum = 0;//当前移动了几个团队的距离
  teamMove(sort) {
    let max = this.teams.length - 3;//团队列表可以移动的最大距离
    if(sort == 'right'){
      if(this.leftNum < max){
        this.leftNum++;
        this.leftMargin = -this.leftNum*228;
      }
    }else if(sort == 'left'){
      if(this.leftNum > 0){
        this.leftNum--;
        this.leftMargin = -this.leftNum*228;
      }
    }
  }

  // 消息提醒
  noticeList = [];
  unReadNum = 0;

  getMessage() {
    let param = {
      page: 1,
      pageSize: 1000,
      type: 0,
      read: -1
    };
    this.http.get('messages', param, (data) => {
      this.noticeList = data.items;
      this.noticeList.forEach((v) => {
        if (v.read == 0) {
          this.unReadNum += 1;
        }
      })
    })
  }
}
