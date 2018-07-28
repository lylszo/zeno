import {Component, OnInit} from '@angular/core';

import {Page} from '../../../component/pagination/page.model';

import {HttpService} from '../../../shared/service/http.service';
import {ActivatedRoute} from '@angular/router';
import {TipPopService} from '../../../shared/service/tipPop.service';
import {isUndefined} from 'util';
import {User} from '../../user-manage/user-manage/user.model';

@Component({
  selector: 'app-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.scss']
})
export class MemberManageComponent implements OnInit {

  username: String = '';
  usermobile: String = '';

  users = [];
  groupMerbers = [];
  teamId: string;
  teamName: string;
  pageConf: Page;

  constructor(private http: HttpService, private route: ActivatedRoute, private tip: TipPopService) {
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 5,
      numPages: 0
    };
  }

  goback() {
    history.back();
  }

  ngOnInit() {
    this.getMember()
  }

  getMember() {
    this.teamId = this.route.snapshot.params.teamId;
    this.teamName = this.route.snapshot.params.teamName;
    let memberParams = {
      teamId: this.teamId,
      page: this.pageConf.currentPage,
      pageSize: this.pageConf.itemsPerPage
    };
    this.http.get('members', memberParams, (data) => {
      this.groupMerbers = data.items;
    });
  }

  // 分页
  pageChanged() {

  }

  // 设为组长 | 成员
  setLeader(obj, num) {
    let ifLeader = false;
    let param: any = {
      // category: obj.category == 0 ? 1 : 0,    // 设为组长：1；成员：0；
      teamId: obj.teamId,
      userId: obj.userId
    };
    if (num == 0) {
      param.category = 0;
      this.http.post('member/update', param, () => {
        obj.category = 0;
        this.tip.setValue('取消组长成功', false);
      });
    } else {
      this.groupMerbers.forEach((v) => {
        if (v.category == 1) {
          this.tip.setValue('组长为' + v.memberName + '，不可重复设置', true);
          ifLeader = true;
          return false;
        }
      });
      if (!ifLeader) {
        param.category = 1;
        this.http.post('member/update', param, () => {
          obj.category = 1;
          this.tip.setValue('设为组长成功', false);
        });
      }
    }
  }

  // 移除成员
  delMember(id) {
    let param = {
      userId: id,
      teamId: this.teamId
    };
    this.http.del('member', () => {
      let i = this.groupMerbers.findIndex(value => value.userId === id);
      this.groupMerbers.splice(i, 1);
      this.tip.setValue('移除成功', false);
    }, param);
  }

  // 搜索
  search() {
    let param: any = {
      page: 1,
      pageSize: 1000,
      joinTeams: this.teamId,
      status: 0
    };
    this.username ? param.name = this.username : isUndefined(param.name);
    this.usermobile ? param.mobile = this.usermobile : isUndefined(param.mobile);
    this.http.get('users', param, (data) => {
      data.items.forEach((v) => {
        v.checked = false;
      });
      this.users = data.items;
    });
  }

  // 清除搜索条件
  clear() {
    this.username = '';
    this.usermobile = '';
  }

  // 全选
  /*checkAll() {

  }*/

  // 选择当前
  // checkedArr = []; // 多选临时数组，保存已选项
  checkedItem: User;  // 单选临时变量，保存已选项
  check(obj) {
    if (obj.checked) {
      obj.checked = false;
      // let i = this.checkedArr.findIndex(value => value.userId === obj.userId);
      // if (i) {
      //   this.checkedArr.splice(i, 1);
      // }
    } else {
      obj.checked = true;
      // this.checkedArr.push(obj);
      this.checkedItem = obj;
      let i = this.users.findIndex(value => value.userId === obj.userId);
      this.users.forEach((value, index) => {
        if (index !== i) {
          value.checked = false;
        }
      });
    }
  }

  // 加入团队
  join() {
    let ifJoin = false;
    let param = {
      userId: this.checkedItem.userId,
      teamId: this.teamId
    };
    this.groupMerbers.forEach((v) => {
      if (v.userId == this.checkedItem.userId) {
        this.tip.setValue("该成员已加入", true);
        ifJoin = true;
        return false;
      }
    });
    if (!ifJoin) {
      this.http.post('member', param, () => {
        this.getMember();
      });
    }
  }

}
