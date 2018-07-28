import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../shared/service/http.service';
import {Page} from '../../../component/pagination/page.model';
import {TipPopService} from '../../../shared/service/tipPop.service';
import {CityNamePipe} from '../../../shared/pipe/city-name.pipe';

@Component({
  selector: 'app-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss']
})
export class RuleManageComponent implements OnInit {
  name: string = '';
  probationList: Array<any> = [];
  probation: string = 'ALL';
  pageConf: Page;
  list: Array<any> = [];
  cityObj: object;

  targetObj = {0: '店铺', 2: '当前登录', 1: '值'};
  attrObj: object = {'sv_city': '服务城市', 'tm_type': '团队类型', 'tm_id': '团队ID', 'us_id': '用户ID'};
  symbolObj: object = {'==': '等于', '!=': '不等于', 'in': '包含', 'notin': '不包含'};
  teamTypeObj: object = {'0': '全部', '1': '自营', '2': '加盟商'};

  constructor(private http: HttpService, private tip: TipPopService) {
    this.pageConf = {
      currentPage: 1,
      itemsPerPage: 10,
      maxSize: 10,
      numPages: 0
    };
    this.cityObj = JSON.parse(localStorage.getItem('cityMap'));
    this.getRuleList();
  }

  isQuery = false;//是否正在查询
  getRuleList() {
    let params = {
      targetTable: this.probation,
      ruleName: this.name,
      page: this.pageConf.currentPage,
      pageSize: this.pageConf.itemsPerPage
    };
    this.isQuery = true;
    this.http.get('dataRules', params, (data) => {
      this.isQuery = false;
      this.list = data.items;
      this.pageConf.totalItems = data.meta.total;
      this.pageConf.currentPage = data.meta.current_page;
      this.pageConf.numPages = data.meta.total_pages;
      if (this.list.length) {
        let len = this.list.length;
        let that = this;
        for (let i = 0; i < len; i++) {
          if (this.list[i].ruleDetails) {
            let details = this.list[i].ruleDetails;
            for (let j = 0; j < details.length; j++) {
              if (details[j].dataLeft === 'sv_city' && details[j].dataRightType === 1) {
                let dataResultArr = details[j].dataRightValue.split(',');
                details[j].dataResult = '';
                for (let item of dataResultArr) {
                  if (item) {
                    details[j].dataResult += that.cityObj[item] + ' ';
                  }
                }
              } else if (details[j].dataLeft === 'tm_type' && details[j].dataRightType === 1) {
                let dataResultArr = details[j].dataRightValue.split(',');
                details[j].dataResult = '';
                for (let item of dataResultArr) {
                  if (item) {
                    details[j].dataResult += that.teamTypeObj[item] + ' ';
                  }
                }
              }
            }
          }

          if (this.list[i].ruleUserConditions) {
            let users = this.list[i].ruleUserConditions;
            for (let j = 0; j < users.length; j++) {
              if (users[j].leftChoose === 'sv_city') {
                let dataResultArr = users[j].rightValue.split(',');
                users[j].userResult = '';
                for (let item of dataResultArr) {
                  if (item) {
                    users[j].userResult += that.cityObj[item] + ' ';
                  }
                }
              } else if (users[j].leftChoose === 'tm_type') {
                let userResultArr = users[j].rightValue.split(',');
                users[j].userResult = '';
                for (let item of userResultArr) {
                  if (item) {
                    users[j].userResult += that.teamTypeObj[item] + ' ';
                  }
                }
              }
            }
          }
        }
      }
    }, (error) => {
      this.isQuery = false;
      this.list = [];
    });
  }

  deleteRule(id) {
    this.http.del('dataRule/' + id, (data) => {
      this.tip.setValue('删除规则成功', true);
      this.getRuleList();
    });
  }

  pageChanged() {
    this.getRuleList();
  }

  ngOnInit() {
    this.probationList = [{code: 'SHOP', name: '店铺'}, {code: 'ALL', name: '全部'}];
    this.probation = 'ALL';
    // this.cityObj = JSON.parse(localStorage.getItem('cityMap'));
  }
}
