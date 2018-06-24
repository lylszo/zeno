import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { RuleService } from '../../service/rule.service';

@Component({
  selector: 'app-rule-add',
  templateUrl: './rule-add.component.html',
  styleUrls: ['./rule-add.component.scss']
})
export class RuleAddComponent implements OnInit {
  items:any;
  datas:any;
  ruleName:string;
  dataObj:Array<any>=[];
  dataSelected:any;
  private id:string;

  constructor(private routerInfo:ActivatedRoute, private rule:RuleService) { }

  /**
   * 添加用户筛选按钮
   */
  addUser(){
    let obj = {
      attributes:[
      {value:1, name:"服务城市"}, {value:2, name: "团队类型"},
      {value:3, name: "团队ID"}, {value:4, name: "用户ID"}],
      attr:1,
      relationships:[
      {value:1, name:"等于"}, {value:2, name: "不等于"},
      {value:3, name: "包含"}, {value:4, name: "不包含"}],
      relate:2,
      selectedCity:[],
      selectedTeamType:[],
      showPanel:false,
      showTeamPanel:false
    };
    this.items.push(obj)
  }

  /**
   * 添加数据筛选条件按钮
   */
  addData(){
    let objdata = {
      leftObjs:[{value:1, name:"店铺"}, {value:2, name: "当前登录"}],
      leftObj:1,
      leftAttributes:[
        {value:1, name:"服务城市"}, {value:2, name: "团队类型"},
        {value:3, name: "团队ID"}, {value:4, name: "用户ID"}],
      leftAttr:1,
      relationships:[
        {value:1, name:"等于"}, {value:2, name: "不等于"},
        {value:3, name: "包含"}, {value:4, name: "不包含"}],
      relate:2,
      rightObjs:[{value:1, name:"店铺"}, {value:2, name: "当前登录"},{value:3, name: "值"}],
      rightObj:1,
      rightAttributes:[
        {value:1, name:"服务城市"}, {value:2, name: "团队类型"},
        {value:3, name: "团队ID"}, {value:4, name: "用户ID"}],
      rightAttr:1,
      selectedCity:[],
      selectedTeamType:[],
      showPanel:false,
      showTeamPanel:false
    };
    this.datas.push(objdata)
  }

  /**
   * 删除对象按钮
   * @param item
   * @param arr
   */
  deleteRule(item,arr){
    arr.splice(arr.indexOf(item),1)
  }

  /**
   * 删除选中城市X
   * @param item
   * @param i
   */
  deleteSelectedCity(item,i){
    item.selectedCity.splice(item.selectedCity.indexOf(i), 1);
    i.checked=false;
  }

  /**
   * 删除选中团队类型X
   * @param item
   * @param i
   */
  deleteSelectedType(item,i){
    item.selectedTeamType.splice(item.selectedTeamType.indexOf(i), 1);
    i.checked=false;
  }

  /**
   * 控制城市面板显示与否
   * @param item
   */
  getCityPanel(item){
    item.showPanel = !item.showPanel;
  }
  /**
   * 控制团队类型面板显示与否
   * @param item
   */
  getTeamPanel(item){
    item.showTeamPanel = !item.showTeamPanel;
  }

  submit(){

  }

  /**
   * 初始化数据
   */
  ngOnInit() {
    this.id = this.routerInfo.snapshot.queryParams["id"];
    this.rule.getRuleById(this.id, (data) => {
      console.log(data,"ruledata")
    });
    this.items =[{
      attributes:[
        {value:1, name:"服务城市"}, {value:2, name: "团队类型"},
        {value:3, name: "团队ID"}, {value:4, name: "用户ID"}],
      attr:1,
      relationships:[
        {value:1, name:"等于"}, {value:2, name: "不等于"},
        {value:3, name: "包含"}, {value:4, name: "不包含"}],
      relate:2,
      selectedCity:[],
      selectedTeamType:[],
      showPanel:false,
      showTeamPanel:false
    }];

    this.datas =[{
      leftObjs:[{value:1, name:"店铺"}, {value:2, name: "当前登录"}],
      leftObj:1,
      leftAttributes:[
        {value:1, name:"服务城市"}, {value:2, name: "团队类型"},
        {value:3, name: "团队ID"}, {value:4, name: "用户ID"}],
      leftAttr:1,
      relationships:[
        {value:1, name:"等于"}, {value:2, name: "不等于"},
        {value:3, name: "包含"}, {value:4, name: "不包含"}],
      relate:2,
      rightObjs:[{value:1, name:"店铺"}, {value:2, name: "当前登录"},{value:3, name: "值"}],
      rightObj:1,
      rightAttributes:[
        {value:1, name:"服务城市"}, {value:2, name: "团队类型"},
        {value:3, name: "团队ID"}, {value:4, name: "用户ID"}],
      rightAttr:1,
      selectedCity:[],
      selectedTeamType:[],
      showPanel:false,
      showTeamPanel:false
    }];
    this.dataObj = [{value:1,name:"全部对象"},{value:2,name:"店铺管理"}];
    this.dataSelected = 1;
  }

}
