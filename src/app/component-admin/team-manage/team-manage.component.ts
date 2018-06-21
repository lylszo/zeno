import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
// import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

// 服务
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-team-manage',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.scss']
})
export class TeamManageComponent implements OnInit {

  constructor(private modalService: BsModalService, private http: HttpService) { }

  ngOnInit() {

    this.getCityList();
  }

  // modalRef: BsModalRef;
  //
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

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
    code: 0,
    name: '---请选择---'
  }, {
    code: 1,
    name: '正常'
  }, {
    code: 2,
    name: '解散'
  }];

  // 所在区域
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

  submit() {
    let params = {};
    this.http.httpGet('group', params, (data) => {
      console.log(data)
    })
  }

}
