import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { Page} from '../../component-common/pagination/page.model';

@Component({
  selector: 'app-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss']
})
export class RuleManageComponent implements OnInit {
  name:string='';
  probationList:Array<any>=[];
  probation:string="ALL";
  pageConf:Page;
  list:Array<any>=[];

  targetObj={0:"店铺", 2:"当前登录",1:"值"};
  attrObj:object={'sv_city':"服务城市", 'tm_type':"团队类型", 'tm_id':"团队ID", 'us_id':"用户ID"};
  symbolObj:object={'==':"等于", '!=':"不等于", 'in':"包含", 'notin':"不包含"};

  constructor(private http:HttpService) {
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 10,
      numPages: 0
    };
    this.getRuleList();
  }

  getRuleList(){
    let params = {
      targetTable: this.probation,
      ruleName: this.name,
      page: this.pageConf.currentPage,
      pageSize: this.pageConf.itemsPerPage
    }
    this.http.get("dataRules", params, (data)=>{
      this.list = data.items;
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
    })
  }

  pageChanged(){
    this.getRuleList()
  }

  ngOnInit() {
    this.probationList = [{code:"SHOP",name:"店铺"},{code:"ALL",name:"全部"}];
    this.probation = "ALL"
  }

}
