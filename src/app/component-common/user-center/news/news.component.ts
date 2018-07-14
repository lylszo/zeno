import {Component, OnInit} from '@angular/core';

import {Page} from "../../pagination/page.model";
import {HttpService} from "../../../service/http.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  noticeList = [];
  pageConf: Page;

  constructor(private http: HttpService) {
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 5,
      numPages: 0
    };
  }

  ngOnInit() {
    this.getNotice();
  }

  unReadNum = 0;

  getNotice() {
    let param = {
      read: -1,
      type: 0,
      page: this.pageConf.currentPage,
      pageSize: this.pageConf.itemsPerPage
    };
    this.http.get('messages', param, (data) => {
      this.noticeList = data.items;
      this.noticeList.forEach((v) => {
        if (v.read == 0) {
          this.unReadNum += 1;
        }
      });
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
    });
  }

  // 分页
  pageChanged() {
    this.getNotice();
  }

}
