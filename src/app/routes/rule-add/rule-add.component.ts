import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {CityNamePipe} from '../../pipe/city-name.pipe';
import {TipPopService} from '../../service/tipPop.service';

@Component({
  selector: 'app-rule-add',
  templateUrl: './rule-add.component.html',
  styleUrls: ['./rule-add.component.scss']
})
export class RuleAddComponent implements OnInit {
  items: Array<any> = [];
  datas: Array<any> = [];
  ruleName: string;
  dataObj: Array<any> = [];
  dataSelected: any;
  private id: string;  // 修改页面时传过来的id
  count: number = 0;

  targetObj = {0: '店铺', 2: '当前登录', 1: '值'};
  attrObj: object = {'sv_city': '服务城市', 'tm_type': '团队类型', 'tm_id': '团队ID', 'us_id': '用户ID'};
  symbolObj: object = {'==': '等于', '!=': '不等于', 'in': '包含', 'notin': '不包含'};
  teamTypeObj: object = {'0': '全部', '1': '自营', '2': '加盟商'};
  cityName: any;

  constructor(private routerInfo: ActivatedRoute, private http: HttpService, private tip: TipPopService, private router: Router) {
    this.cityName = new CityNamePipe();
  }

  back() {
    history.back();
  }

  /**
   * 添加用户筛选按钮
   */
  addUser() {
    this.count += 1;
    this.items.push({
      formName: 'formName' + this.count,
      attributes: [
        {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
        {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
      attr: 'sv_city',
      relationships: [
        {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
        {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
      relate: '==',
      selectedCity: [],
      selectedTeamType: []
    });
  }

  /**
   * 添加数据筛选条件按钮
   */
  addData() {
    this.count += 1;
    let objdata = {
      dataName: 'dataName' + this.count,
      leftObjs: [{value: 0, name: '店铺'}, {value: 2, name: '当前登录'}],
      leftObj: 2,
      leftAttributes: [
        {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
        {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
      leftAttr: 'sv_city',
      relationships: [
        {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
        {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
      relate: '==',
      rightObjs: [{value: 0, name: '店铺'}, {value: 1, name: '值'}],
      rightObj: 0,
      rightAttributes: [
        {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
        {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
      rightAttr: 'sv_city',
      selectedCity: [],
      selectedTeamType: []
    };
    this.datas.push(objdata);
  }

  /**
   * 删除对象按钮
   * @param item
   * @param arr
   */
  deleteRule(item, arr) {
    arr.splice(arr.indexOf(item), 1);
  }


  submit(invalid) {
    let error = document.getElementsByClassName('error');
    if (invalid || error.length) {
      this.tip.setValue('请填写相关字段', true);
    } else {
      let ruleName = this.ruleName;
      let targetTable = this.dataSelected;
      let ruleUserConditions = [];
      let ruleDetails = [];
      let userRight = '';
      let dataRight = '';
      this.items.forEach(function (value) {
        if (value.selectedTeamType.length && value.attr === 'tm_type') {
          let teamType = [];
          for (let i = 0; i < value.selectedTeamType.length; i++) {
            teamType.push(value.selectedTeamType[i].value);
          }
          userRight = teamType.join(',');
        } else if (value.selectedCity.length && value.attr === 'sv_city') {
          let cityCode = [];
          let len = value.selectedCity.length;
          for (let i = 0; i < len; i++) {
            cityCode.push(value.selectedCity[i].code);
          }
          userRight = cityCode.join(',');
        } else {
          userRight = value.value;
        }
        ruleUserConditions.push({
          leftChoose: value.attr, midSymbol: value.relate,
          rightValue: userRight, andOr: 'and'
        });
      });
      this.datas.forEach(function (value) {
        if (value.rightObj === 0) {
          dataRight = value.leftAttr;
        } else {
          if (value.leftAttr === 'tm_type') {
            let teamType = [];
            for (let i = 0; i < value.selectedTeamType.length; i++) {
              teamType.push(value.selectedTeamType[i].value);
            }
            dataRight = teamType.join(',');
          } else if (value.leftAttr === 'sv_city') {
            let cityCode = [];
            let len = value.selectedCity.length;
            for (let i = 0; i < len; i++) {
              cityCode.push(value.selectedCity[i].code);
            }
            dataRight = cityCode.join(',');
          } else {
            dataRight = value.value;
          }
        }
        ruleDetails.push({
          dataLeft: value.leftAttr, dataRightType: value.rightObj,
          dataSymbol: value.relate, dataRightValue: dataRight, andOr: 'and'
        });
      });
      let params = {
        description: '',
        ruleName: ruleName,
        ruleUserConditions: ruleUserConditions,
        ruleDetails: ruleDetails,
        targetTable: targetTable
      };

      if (!this.id) {
        this.http.post('dataRule', params, (data) => {
          this.tip.setValue('添加成功', false);
        });
      } else {
        this.http.put('dataRule/' + this.id, params, (data) => {
          this.tip.setValue('修改成功', false);
        });
      }
      history.back();
    }
  }

  /**
   * 初始化数据
   */
  ngOnInit() {
    this.id = this.routerInfo.snapshot.queryParams['id'];
    if (this.id) {
      let that = this;
      this.http.get('dataRule/' + this.id, '', (data) => {
        let result = data.ruleDetails;
        // let result = [{dataLeft: 'sv_city', dataRightType: 1, dataRightValue: '11,44', dataSymbol: '==', id: 7}];
        this.dataObj = [{value: 'all', name: '全部对象'}, {value: 'shop', name: '店铺管理'}];
        this.dataSelected = data.targetTable ? data.targetTable : 'all';
        this.ruleName = data.ruleName;
        if (result) {
          result.forEach(function (value) {
            let resCity = [];
            let resTeamType = [];
            that.count += 1;
            let dataName = 'dataName' + that.count;
            let leftObj = 2;
            let leftAttr = value.dataLeft;
            let relate = value.dataSymbol;
            let dataObj = value.dataRightType;
            let val = value.dataRightValue;
            if (leftAttr === 'sv_city' && val) {
              val.split(',').forEach(function (city) {
                let name = that.cityName.transform(city);
                resCity.push({code: Number(city), name: name});
              });
            } else if (leftAttr === 'tm_type' && val) {
              val.split(',').forEach(function (type) {
                resTeamType.push({value: type, name: that.teamTypeObj[type], checked: true});
              });
            }
            that.datas.push({
              dataName: dataName,
              leftObjs: [{value: 0, name: '店铺'}, {value: 2, name: '当前登录'}],
              leftObj: leftObj,
              leftAttributes: [
                {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
                {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
              leftAttr: leftAttr,
              relationships: [{value: '==', name: '等于'}, {value: '!=', name: '不等于'},
                {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
              relate: relate,
              rightObjs: [{value: 0, name: '店铺'}, {value: 1, name: '值'}],
              rightObj: dataObj,
              rightAttributes: [
                {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
                {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
              rightAttr: leftAttr,
              value: val,
              selectedCity: resCity,
              selectedTeamType: resTeamType
            });
          });
        } else {
          this.datas = [{
            dataName: 'dataName' + this.count,
            leftObjs: [{value: 0, name: '店铺'}, {value: 2, name: '当前登录'}],
            leftObj: 2,
            leftAttributes: [
              {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
              {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
            leftAttr: 'sv_city',
            relationships: [
              {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
              {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
            relate: '==',
            rightObjs: [
              {value: 0, name: '店铺'}, {value: 1, name: '值'}],
            rightObj: 0,
            rightAttributes: [
              {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
              {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
            rightAttr: 'sv_city',
            selectedCity: [],
            selectedTeamType: []
          }];
        }

        let user = data.ruleUserConditions;
        // let user = [{leftChoose: 'sv_city', rightValue: '11,44', midSymbol: '=='}];
        if (user) {
          user.forEach(function (userItem) {
            that.count += 1;
            let userCity = [];
            let userTeamType = [];
            let formName = 'formName' + that.count;
            let attr = userItem.leftChoose;
            let relate = userItem.midSymbol;
            let value = userItem.rightValue;
            if (attr === 'sv_city' && value) {
              value.split(',').forEach(function (city) {
                let name = that.cityName.transform(city);
                userCity.push({code: Number(city), name: name});
              });
            } else if (attr === 'tm_type' && value) {
              value.split(',').forEach(function (type) {
                userTeamType.push({value: type, name: that.teamTypeObj[type], checked: true});
              });
            }
            that.items.push({
              formName: formName,
              attributes: [
                {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
                {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
              attr: !attr ? 'sv_city' : attr,
              relationships: [
                {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
                {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
              relate: !relate ? '==' : relate,
              value: value ? value : '',
              selectedCity: userCity ? userCity : [],
              selectedTeamType: userTeamType ? userTeamType : []
            });
          });
        } else {
          this.items = [{
            formName: 'formName' + this.count,
            attributes: [
              {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
              {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
            attr: 'sv_city',
            relationships: [
              {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
              {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
            relate: '==',
            selectedCity: [],
            selectedTeamType: []
          }];
        }
      });
    } else {
      this.items = [{
        formName: 'formName' + this.count,
        attributes: [
          {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
          {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
        attr: 'sv_city',
        relationships: [
          {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
          {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
        relate: '==',
        selectedCity: [],
        selectedTeamType: []
      }];

      this.datas = [{
        dataName: 'dataName' + this.count,
        leftObjs: [{value: 0, name: '店铺'}, {value: 2, name: '当前登录'}],
        leftObj: 2,
        leftAttributes: [
          {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
          {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
        leftAttr: 'sv_city',
        relationships: [
          {value: '==', name: '等于'}, {value: '!=', name: '不等于'},
          {value: 'in', name: '包含'}, {value: 'notin', name: '不包含'}],
        relate: '==',
        rightObjs: [
          {value: 0, name: '店铺'}, {value: 1, name: '值'}],
        rightObj: 0,
        rightAttributes: [
          {value: 'sv_city', name: '服务城市'}, {value: 'tm_type', name: '团队类型'},
          {value: 'tm_id', name: '团队ID'}, {value: 'us_id', name: '用户ID'}],
        rightAttr: 'sv_city',
        selectedCity: [],
        selectedTeamType: []
      }];
      this.dataObj = [{value: 'all', name: '全部对象'}, {value: 'shop', name: '店铺管理'}];
      this.dataSelected = 'all';
    }
  }
}
