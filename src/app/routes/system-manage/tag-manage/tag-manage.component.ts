import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {HttpService} from '../../../shared/service/http.service';
import { Page} from '../../../component/pagination/page.model';

@Component({
  selector: 'app-tag-manage',
  templateUrl: './tag-manage.component.html',
  styleUrls: ['./tag-manage.component.scss']
})
export class TagManageComponent implements OnInit {

  pageConf:Page;
  list:Array<object>;
  applyObj={'0':"用户", '1':"团队"};

  constructor(private modalService: BsModalService, private http:HttpService) {
  }

  isQuery = false;
  getTagList(){
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 5,
      numPages: 0
    };
    let param = {
      page:this.pageConf.currentPage,
      pageSize:this.pageConf.itemsPerPage
    };
    this.isQuery = true;
    this.http.get("tag",param, (data) => {
      this.isQuery = false;
      this.list=data.items;
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
    }, (error) => {
      this.isQuery = false;
      this.list = [];
    })
  }
  // 模态框
  // modalRef: BsModalRef;
  // openModal(template: TemplateRef<any>){
  //   this.modalRef = this.modalService.show(template);
  // }
  pageChanged(){
    this.getTagList()
  }
  ngOnInit() {
    this.getTagList()
  }

}



