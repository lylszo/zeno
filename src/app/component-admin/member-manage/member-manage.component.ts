import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.scss']
})
export class MemberManageComponent implements OnInit {

  users: Array<any>;
  groupMerbers: Array<any>;

  constructor() {
    this.users = [{
      createTime: 0,
      email: "string",
      mobile: "string",
      name: "string",
      states: 0,
      userId: "string",
      workingCity: {
        "code": 0,
        "hot": 0,
        "name": "string",
        "status": 0
      }
    }, {
      createTime: 0,
      email: "222.email.com",
      mobile: "12222333333",
      name: "nicole",
      states: 1,
      userId: "1234567",
      workingCity: {
        "code": 0,
        "hot": 0,
        "name": "深圳",
        "status": 0
      }
    }];
    this.groupMerbers = [{
      category: 0,
      createTime: 0,
      creator: "hhh",
      id: 0,
      joinTime: 0,
      joinUserId: "sss",
      quitReason: "ddddfffvvvv",
      quitTime: 0,
      quitUserId: "eeee",
      status: 0,
      teamId: "21",
      userId: "31"
    }]
  }

  goback() {
    history.back();
  }

  ngOnInit() {
  }

}
