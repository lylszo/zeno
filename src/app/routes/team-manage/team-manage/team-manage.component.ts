import {Component, OnInit, TemplateRef} from '@angular/core';
import {isUndefined} from 'util';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

// 数据模型
import {Tag} from '../../../component/set-related-tags/tags.model';
import {SearchParam} from './search.model';
import {Page} from '../../../component/pagination/page.model';
import {City} from "../../user-manage/user-manage/city.model";

// 服务
import {HttpService} from '../../../shared/service/http.service';
import {Team} from './team.model';
import {TipPopService} from '../../../shared/service/tipPop.service';
import {CommonService} from "../../../shared/service/common.service";

@Component({
  selector: 'app-team-manage',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.scss']
})
export class TeamManageComponent implements OnInit {

  params: SearchParam = {
    type: 0,
    name: '',
    status: -1,
    workingDistrict: -1,
    page: 1,
    pageSize: 10
  };
  pageConf: Page;
  lists: Team[];
  team: Team;
  point: Point;
  newTeam: Team;
  thisIndex: number;
  permission: any;

  teamType = [{
    code: 0,
    name: '---请选择---'
  }, {
    code: 1,
    name: '自营'
  }, {
    code: 2,
    name: '加盟店'
  }];

  teamState = [{
    code: -1,
    name: '---请选择---'
  }, {
    code: 0,
    name: '正常'
  }, {
    code: 1,
    name: '解散'
  }];

  teamTypeObj = {1: '自营团队', 2: '加盟商团队'};

// 标签
  tagList: Tag[]; // 标签对象列表
  tags: Array<number>;  // 标签id数组

  constructor(private modalService: BsModalService, private  http: HttpService,
              private tip: TipPopService, private common: CommonService) {
    this.tagList = [];
    this.tags = [];
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

// 模态框
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>, obj, index) {
    this.modalRef = this.modalService.show(template);
    this.newTeam = obj;
    this.thisIndex = index;
    this.team = JSON.parse(JSON.stringify(obj));
    this.point = {
      lng: this.team.longitude,
      lat: this.team.latitude
    };
  }

  // 查询
  isQuery = false;
  submit() {
    let param = JSON.parse(JSON.stringify(this.params));
    param.page = this.pageConf.currentPage;
    param.pageSize = this.pageConf.itemsPerPage;
    if (!param.name) {
      delete param.name;
    }
    if (param.type == 0) {
      delete param.type;
    }
    if (param.status == -1) {
      delete param.status;
    }
    if (param.workingDistrict == -1) {
      delete param.workingDistrict;
    }
    this.tags.length > 0 ? param.tag = this.tags : isUndefined(param.tag);
    this.isQuery = true;
    this.http.get('teams', param, (data) => {
      this.isQuery = false;
      this.lists = data.items;
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
    }, (error) => {
      this.isQuery = false;
      this.lists = [];
    });
  }

  cityItem: City;

// 清空搜索条件
  clearSearch() {
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 5,
      numPages: 0
    };
    this.params = {
      name: '',
      type: 0,
      status: -1,
      workingDistrict: -1,
      page: this.pageConf.currentPage,
      pageSize: this.pageConf.itemsPerPage
    };
    this.cityItem = {
      name: '---请选择---',
      code: -1
    };
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

  editTags = [];

// 编辑团队信息
  editTeam() {
    if (!this.team.name) {
      this.tip.setValue('请输入团队名称', true);
      return;
    }
    if (this.team.type == 0) {
      this.tip.setValue('请选择团队类型', true);
      return;
    }
    if (this.team.cityId == -1) {
      this.tip.setValue('请选择所在区域', true);
      return;
    }
    if (!this.team.address) {
      this.tip.setValue('请输入团队地址', true);
      return;
    }
    if (!this.point.lat && !this.point.lng) {
      this.tip.setValue('请选择具体位置', true);
      return;
    }
    let params: any = {
      name: this.team.name,
      type: this.team.type,
      workingDistrict: this.team.cityId,
      address: this.team.address,
      latitude: this.point.lat,
      longitude: this.point.lng,
    };
    this.team.remark ? params.descriptoin = this.team.remark : isUndefined(params.descriptoin);

    this.editTags.length > 0 ? params.tags = this.editTags : isUndefined(params.tags);

    this.http.put('team/' + this.team.teamId, params, () => {
      this.tip.setValue('修改成功', false);
      this.newTeam.name = this.team.name;
      this.newTeam.type = this.team.type;
      this.newTeam.cityId = this.team.cityId;
      this.newTeam.cityVo = this.team.cityVo;
      this.newTeam.address = this.team.address;
      this.newTeam.remark = this.team.remark;
      this.newTeam.tags = this.team.tags;
      this.newTeam.longitude = this.point.lng;
      this.newTeam.latitude =  this.point.lat;
      this.modalRef.hide();
    });
  }

// 解散
  dissolve() {
    this.http.del('team/' + this.team.teamId, () => {
      this.team.status = 1;
      this.tip.setValue('该团队已解散！', true);
      // this.lists.splice(this.thisIndex,1)
      this.submit();
    });
  }

  // 分配服务区域
  cityChecked: Number[] = [];

  asignDistrict(id) {
    let param = {
      cityIds: this.cityChecked
    };
    this.http.put('team/' + id, param, () => {
      this.tip.setValue('服务区域分配成功', false);
      // this.cityChecked = [];
    });
  }

}

interface Point {
  lng: any;
  lat: any;
}
