import {Component, TemplateRef} from '@angular/core';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {Tag} from "./tags.model";
import {fakeAsync} from "@angular/core/testing";

@Component({
  selector: 'app-set-related-tags',
  templateUrl: './set-related-tags.component.html',
  styleUrls: ['./set-related-tags.component.scss']
})
export class SetRelatedTagsComponent {

  isModalShown: Boolean = false;

  tagList: Tag[];

  lists = [{
    type: '用户',
    attr: 'yonghu',
    active: true,
    childs: [
      {
        creator: "nicole",
        id: 0,
        name: "大学生",
      }, {
        creator: "nicole",
        id: 0,
        name: "兼职",
      }
    ]
  }, {
    type: '团队',
    attr: 'tuandui',
    active: false,
    childs: [
      {
        creator: "nicole",
        id: 0,
        name: "大区经理",
      }, {
        creator: "nicole",
        id: 0,
        name: "业务员"
      }
    ]
  }];

  childList = [{
    creator: "nicole",
    id: 0,
    name: "大区经理",
    active: false
  }, {
    creator: "nicole",
    id: 0,
    name: "业务员",
    active: false
  }];

  constructor(private modalService: BsModalService) {
    this.tagList = [
      new Tag(1, '转店'),
      new Tag(2, '寻址'),
      new Tag(3, '兼职')
    ];
  }

  delTag(i): void {
    console.log(i)
    this.tagList.splice(i, 1);
  }

  addTag(): void {
    this.tagList.push(new Tag(4, 'test'));
  }

  typeChoosed(obj) {
    obj.active = true;
  }

  tagChoosed(obj) {
    if (!obj.active) {
      obj.active = true;
      this.tagList.push(new Tag(obj.id, obj.name));
    } else {
      obj.active = false;
    }
  }

  modalRef: BsModalRef;

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.isModalShown = false;
  }

}
