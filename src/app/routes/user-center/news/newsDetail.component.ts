import {Component, OnInit} from '@angular/core';

import {HttpService} from "../../../shared/service/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-news-detail',
  templateUrl: './newsDetail.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsDetailComponent implements OnInit {

  newsId: number;
  details: Object = {};

  constructor(private http: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newsId = this.route.snapshot.params.id;
    this.getDetail();
    this.setReaded();
  }


  // 获取公告详情
  getDetail() {
    this.http.get('message/' + this.newsId, '', (data) => {
      console.log(data)
      this.details = data;
    })
  }

  // 设置已读
  setReaded() {
    let param = {
      msgId: this.newsId
    };
    this.http.post('message/setRead', param, () => {

    })
  }

  goback() {
    history.back();
  }

}
