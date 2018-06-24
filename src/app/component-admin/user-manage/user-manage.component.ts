import {Component, OnInit, TemplateRef} from '@angular/core';
import {isUndefined} from "util";
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

// 数据模型
import {SearchParam} from "./search.model";
import {Tag} from "../set-related-tags/tags.model";

// 服务
import {HttpService} from "../../service/http.service";

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
  editTagList: Array<object>; // 标签对象列表
  tags: Array<number>;  // 标签id数组
  editTags: Array<number>;  // 标签id数组
  city: number;
  cityList: Array<object>;

  // searchObj: SearchModel;

  constructor(private modalService: BsModalService, private http: HttpService) {
    this.tagList = [];
    this.tags = [];
    // this.searchObj = new SearchModel();
  }

  ngOnInit() {
    this.getCityList()
  }

  // 模态框
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // 数据初始化
  // 状态
  statusList = [{
    code: 1,
    name: '正常'
  }, {
    code: 2,
    name: '禁用'
  }];

  // 工作城市
  /*cityList = [{
    code: -1,
    name: '全国'
  }];*/

  // city = -1;

  getCityList() {
    let auth = this.http.auth;

    let cityParams = {
      Authorization: auth,
      parent_id: 0
    };

    this.http.httpGet('district', cityParams, (data) => {
      // this.cityList = this.cityList.concat(data);
      this.cityList = data;
      this.city = data[0].code;
    })
  }

  // 表单查询

  submit() {
    let params: SearchParam = {
      status: this.status,
      working_city: this.city,
      page: 1,
      pageSize: 10,
      Authorization: this.http.auth
    };
    this.mobile ? params.mobile = this.mobile : isUndefined();
    this.name ? params.name = this.name : isUndefined();
    this.tags.length > 0 ? params.tags = this.tags : isUndefined();
    this.http.httpGet('user', params, (data) => {
      console.log(data);
      this.totalItems = data.meta.total;
      this.currentPage = data.meta.current_page;
    })
  }

  // 清空搜索条件
  clearSearch() {
    this.mobile = '';
    this.name = '';
    this.status = 1;
    this.city = -1;
    this.tags = [];
    this.tagList.forEach((v) => {
      v.active = false;
    });
    this.tagList = [];
  }


  // 分页
  totalItems: number;
  currentPage: number;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {

  }

}
