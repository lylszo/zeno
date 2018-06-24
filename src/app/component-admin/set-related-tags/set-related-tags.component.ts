import {Component, OnInit, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

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

  @Input() tagList: Tag[];       // 标签对象列表
  @Input() tags: Array<number>;    // 标签id数组

  @Output() tagsChange = new EventEmitter();     // 输出标签id数组

  isModalShown: Boolean = false;

  pType: number;

  lists = [];

  childList = [];

  constructor(private modalService: BsModalService, private http: HttpService) {
    this.tagList = [];
  }

  ngOnInit() {
    this.getTagList();
    this.tagsChange.emit(this.tags);
  }

  // 请求标签接口
  getTagList() {
    let tagParam = {
      page: 1,
      pageSize: 100,
      Authorization: this.http.auth
    };
    this.http.httpGet('tag', tagParam, (data) => {
      // this.lists = data.items;
      this.lists = [
        {
          creator: "nicole",
          id: 0,
          name: "标签1",
          type: 1
        }, {
          creator: "nicole",
          id: 1,
          name: "标签2",
          type: 1
        }, {
          creator: "nicole",
          id: 2,
          name: "标签3",
          type: 1
        }, {
          creator: "nicole",
          id: 3,
          name: "标签21",
          type: 2
        }, {
          creator: "nicole",
          id: 4,
          name: "标签22",
          type: 2
        }
      ];
      this.lists.forEach((v, i) => {
        // v.avtive = i === 0 ? true : false;
        if (v.type === 1) {
          this.childList.push(v);
        }
      });
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
    this.tagList[i].active = false;
    this.tagList.splice(i, 1);
    this.tags.splice(i, 1);
  }

  // 选择标签
  tagChoosed(obj) {
    if (obj.active) {
      obj.active = false;
      let i = this.tagList.findIndex(tag => tag.id === obj.id);
      this.tagList.splice(i, 1);
      let m = this.tags.findIndex(v => v === obj.id);
      this.tags.splice(m, 1);
    } else {
      obj.active = true;
      this.tagList.push(obj);
      this.tags.push(obj.id);
    }
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
