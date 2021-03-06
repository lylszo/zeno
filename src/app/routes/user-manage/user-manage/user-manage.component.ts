import {Component, OnInit, TemplateRef} from '@angular/core';
import {isUndefined} from 'util';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

// 数据模型
import {SearchParam} from './search.model';
import {Tag} from '../../../component/set-related-tags/tags.model';
import {City} from './city.model';
import {User} from './user.model';
import {Page} from '../../../component/pagination/page.model';

// 服务
import {HttpService} from '../../../shared/service/http.service';
import {TipPopService} from '../../../shared/service/tipPop.service';
import {Team} from '../../team-manage/team-manage/team.model';
import {CommonService} from "../../../shared/service/common.service";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})

export class UserManageComponent implements OnInit {

  name: string;
  mobile: string;
  status: number;
  tagList: Tag[]; // 标签对象列表
  tags: Array<number>;  // 标签id数组
  city: number;
  userList: User[];
  user: User;
  newUser: User;
  pageConf: Page;
  permission: any;

  // 团队管理
  joinedTeam: Team[];   // 已加入团队
  teamList: Team[];     // 团队搜索结果
  searchTeamParam: String;  // 搜索参数

  constructor(private modalService: BsModalService, private http: HttpService,
              private tip: TipPopService, private common: CommonService) {
    this.status = -1;
    this.tagList = [];
    this.tags = [];
    this.city = -1;
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 5,
      numPages: 0
    };
  }

  ngOnInit() {
    this.submit();
    this.common.getUserPermission(data => {
      this.permission = data;
    });
  }

  // 数据初始化
  // 状态
  statusList = [{
    code: -1,
    name: '---请选择---'
  }, {
    code: 0,
    name: '正常'
  }, {
    code: 1,
    name: '禁用'
  }];

  // 表单查询
  isQuery = false;
  submit() {
    let params: SearchParam = {
      page: this.pageConf.currentPage,
      pageSize: this.pageConf.itemsPerPage,
    };
    this.status != -1 ? params.status = this.status : isUndefined(params.status);
    this.city != -1 ? params.serviceCity = this.city : isUndefined(params.serviceCity);
    this.mobile ? params.mobile = this.mobile : isUndefined(params.mobile);
    this.name ? params.name = this.name : isUndefined(params.name);
    this.tags.length > 0 ? params.tags = this.tags : isUndefined(params.tags);

    // this.userList = [{name: 'test', email: '', mobile: '', userId: '', states: 0, workingCity: {code: 1, name: ''}, createTime: 0}];
    this.isQuery = true;
    this.http.get('users', params, (data) => {
      this.isQuery = false;
      this.userList = data.items;
      this.user = data.items[0];
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
    }, (error) => {
      this.isQuery = false;
      this.userList = [];
    });
  }

  cityItem: City;

  // 清空搜索条件
  clearSearch() {
    this.mobile = '';
    this.name = '';
    this.status = -1;
    this.cityItem = {
      name: '---请选择---',
      code: -1
    };
    this.city = -1;
    this.tags = [];
    this.tagList.forEach((v) => {
      v.active = false;
    });
    this.tagList = [];
  }

  // 分页
  pageChanged() {
    this.submit();
  }

  // 模态框
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>, obj: User) {
    this.modalRef = this.modalService.show(template);
    this.newUser = obj;
    this.user = JSON.parse(JSON.stringify(obj));
    this.user.workingCity = obj.workingCity ? this.user.workingCity : {name: '', code: -1};
    this.user.tags = obj.tags ? this.user.tags : [];
    this.user.districts = obj.districts ? this.user.districts : [];
    this.joinedTeam = obj.teams ? this.user.teams : [];
    this.teamList = [];
    this.searchTeamParam = '';
  }

  // 编辑
  editTags = [];

  editUser(): void {
    let params = {
      name: this.user.name,
      mobile: this.user.mobile,
      email: this.user.email,
      workingCityId: this.user.workingCity.code,
      tags: this.editTags
    };
    if (this.editTags.length === 0) {
      params.tags = [];
    }
    this.http.put('user/' + this.user.userId, params, () => {
      this.tip.setValue('修改成功', false);
      this.newUser.name = this.user.name;
      this.newUser.mobile = this.user.mobile;
      this.newUser.workingCity = this.user.workingCity;
      this.newUser.workingCity.code = this.user.workingCity.code;
      this.newUser.email = this.user.email;
      this.newUser.tags = this.user.tags;
      this.modalRef.hide();
    }, () => {
      this.user.workingCity.code = this.user.workingCity ? this.user.workingCity.code : -1;
    });
  }

  disableUser(): void {
    let param = {status: 1};
    this.http.put('user/' + this.user.userId, param, () => {
      this.newUser.status = 1;
      this.tip.setValue('禁用成功', false);
    });
  }

  activeUser(): void {
    let param = {status: 0};
    this.http.put('user/' + this.user.userId, param, () => {
      this.newUser.status = 0;
      this.tip.setValue('恢复成功', false);
    });
  }

  /**
   *  分配团队函数集  start
   */
  // 查询团队
  searchTeam() {
    if (this.searchTeamParam) {
      this.http.get('teams', {name: this.searchTeamParam, page: 1, pageSize: 1000, status: 0}, (data) => {
        this.teamList = data.items;
        if (!this.teamList.length) {
          this.tip.setValue("该团队不存在", true);
        }
      });
    } else {
      this.tip.setValue('请输入查询团队名称', true);
    }
  }

  // 添加团队
  addTeam(obj: Team) {
    let ifJoined = this.joinedTeam.find((v): any => {
      if (v.id) {
        return v.id === obj.teamId;
      } else {
        return v.teamId === obj.teamId;
      }
    });
    if (ifJoined) {
      this.tip.setValue('该团队已分配给该成员', true);
    } else {
      this.joinedTeam.push(obj);
    }
  }

  // 删除团队
  removeTeam(i) {
    this.joinedTeam.splice(i, 1);
  }

  // 分配团队
  addTeamSubmit() {
    let teamIds = [];
    if (this.joinedTeam.length) {
      this.joinedTeam.forEach(value => {
        teamIds.push(value.teamId || value.id);
      });
    }
    let param = {
      userId: this.user.userId,
      teamIds: teamIds
    };
    this.http.post('member/assign', param, () => {
      this.tip.setValue('操作成功', false);
      this.newUser.teams = this.joinedTeam;
    });
  }

  /**
   *  分配团队函数集  end
   */

  cityChecked: Number[] = [];

  // 分配服务区域
  asignDistrict(id) {
    let param = {
      districts: this.cityChecked
    };
    this.http.put('user/' + id, param, () => {
      this.tip.setValue("服务区域分配成功", false);
    })
  }

}
