import {Component, OnInit, TemplateRef} from '@angular/core';
import {isUndefined} from "util";
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

// 数据模型
import {Tag} from "../set-related-tags/tags.model";
import {SearchParam} from "./search.model";
import {Page} from "../../component-common/pagination/page.model";

// 服务
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-team-manage',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.scss']
})
export class TeamManageComponent implements OnInit {

  params: SearchParam;
  pageConf: Page;
  lists: Array<Object>;

// 标签
  tagList: Tag[]; // 标签对象列表
  tags: Array<number>;  // 标签id数组

  constructor(private modalService: BsModalService, private http: HttpService) {
    this.tagList = [];
    this.tags = [];
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 5,
      numPages: 0
    };
    this.params = {
      name: '',
      type: 0,
      status: 0,
      workingDistrict: -1,
      page: 1,
      pageSize: 10
    };
  }

  ngOnInit() {
    this.submit();
  }


  // 模态框
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  teamType = [{
    code: 0,
    name: '-请选择-'
  }, {
    code: 1,
    name: '自营'
  }, {
    code: 2,
    name: '加盟店'
  }];

  teamState = [{
    code: 0,
    name: '正常'
  }, {
    code: 1,
    name: '解散'
  }];

  submit() {
    this.params.page = this.pageConf.currentPage;
    this.params.pageSize = this.pageConf.itemsPerPage;
    if (!this.params.name) {
      delete this.params.name;
    }
    if (this.params.type === 0) {
      delete this.params.type
    }
    if (this.params.workingDistrict === -1) {
      delete this.params.workingDistrict;
    }
    this.tags.length > 0 ? this.params.tag = this.tags : isUndefined(this.params.tag);
    this.http.get('teams', this.params, (data) => {
      this.lists = data.items;
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
    })
  }

  // 清空搜索条件
  clearSearch() {
    this.params = {
      name: '',
      type: 0,
      status: 0,
      workingDistrict: -1,
      page: 1,
      pageSize: 10
    };
    this.tags = [];
    this.tagList.forEach((v) => {
      v.active = false;
    });
    this.tagList = [];
  }

  pageChanged() {
    this.submit();
  }

}
