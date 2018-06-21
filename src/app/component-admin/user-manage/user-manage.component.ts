import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

// 数据模型
import {SearchModel} from "./search.model";

// 服务
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  constructor(private modalService: BsModalService, private http: HttpService) {

  }

  // 分页
  totalItems = 64;
  currentPage = 4;
  smallnumPages = 0;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  // 模态框
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // 数据初始化
  // 状态
  stateList = [{
    code: 1,
    name: '正常'
  }, {
    code: 2,
    name: '禁用'
  }];

  // 工作城市
  cityList = [{
    code: 0,
    name: '全国'
  }];

  getCityList() {
    let auth = this.http.auth;

    let cityParams = {
      Authorization: auth,
      parent_id: 0
    };

    this.http.httpGet('district', cityParams, (data) => {
      this.cityList = this.cityList.concat(data);
    })
  }

  // 表单查询
  // searchObj = new SearchModel();

  submit() {
    let params = {};
    this.http.httpGet('user', params, (data) => {
      console.log(data)
    })
  }

  ngOnInit() {
    this.getCityList()
  }

}
