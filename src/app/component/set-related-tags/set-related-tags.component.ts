import {Component, OnInit, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';


// 数据模型
import {Tag} from "./tags.model";

// 服务
import {HttpService} from "../../shared/service/http.service";

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

  constructor(private modalService: BsModalService, private http: HttpService) {}

  ngOnInit() {
    this.getTagList();
    this.tags = [];
    if (this.tagList) {
      this.tagList.forEach((v) => {
        this.tags.push(v.id);
      })
    } else {
      this.tagList = [];
    }
    this.tagsChange.emit(this.tags);
  }

  // 请求标签接口
  getTagList() {
    let tags = JSON.parse(localStorage.getItem('tags'));
    if (tags) {
      this.lists = tags;
    } else {
      let tagParam = {
        page: 1,
        pageSize: 100
      };
      this.http.get('tag', tagParam, (data) => {
        this.lists = data.items;
        localStorage.setItem('tags', JSON.stringify(data.items));
      });
    }
    if (this.lists.length > 0) {
      this.lists.forEach((v, i) => {
        // v.avtive = i === 0 ? true : false;
        if (v.type === 1) {
          this.childList.push(v);
        }
      });
    }
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
