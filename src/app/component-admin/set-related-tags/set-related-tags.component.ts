import {Component, OnInit, Output, TemplateRef} from '@angular/core';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';


// 数据模型
import {Tag} from "./tags.model";

// 服务
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-set-related-tags',
  templateUrl: './set-related-tags.component.html',
  styleUrls: ['./set-related-tags.component.scss']
})
export class SetRelatedTagsComponent implements OnInit {

  // @Output tagList;

  isModalShown: Boolean = false;

  tagList: Tag[];

  pType: number;

  lists = [];

  childList = [];

  constructor(private modalService: BsModalService, private http: HttpService) {
    this.tagList = [];
  }

  ngOnInit() {
    this.getTagList();
  }

  // 请求标签接口
  getTagList() {
    let tagParam = {
      page: 1,
      pageSize: 100,
      Authorization: this.http.auth
    };
    this.http.httpGet('tag', tagParam, (data) => {
      this.lists = data.items;
      this.lists.forEach((v) => {
        if (v.type === 1) {
          this.childList.push(v);
        }
      });
      console.log(data)
    })
  }

  getTagChild(num) {
    this.pType = num;
    this.childList = [];
    this.lists.forEach((v) => {
      if (v.type === num) {
        this.childList.push(v);
      }
    })
  }

  // 删除标签
  delTag(i): void {
    this.tagList.splice(i, 1);
  }

  // 选择标签
  tagChoosed(obj) {
      this.tagList.push(obj);
  }

  // 模态框
  modalRef: BsModalRef;

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.isModalShown = false;
  }

}
