import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {

  roles:any;
  menus:any;
  menuItems:any;
  items:any;
  constructor() { }

  ngOnInit() {
    this.roles = [{
      value:1,
      name:"自营业务角色"
    },{
      value:2,
      name:"城市管理角色"
    },{
      value:3,
      name:"大区管理角色"
    },{
      value:4,
      name:"财务管理角色"
    },{
      value:5,
      name:"认识角色"
    }];
    this.menus = [{
      value:1,
      name:"团队管理"
    },{
      value:2,
      name:"用户管理"
    },{
      value:3,
      name:"业务服务大厅"
    }];
    this.menuItems = [{
      value:1,
      name:"团队管理",
      checked:false
    },{
      value:2,
      name:"用户管理",
      checked:false
    },{
      value:3,
      name:"业主管理",
      checked:false
    }];

    this.items = [{
      value:1,
      name:"团队创建",
      checked:false
    },{
      value:2,
      name:"用户编辑",
      checked:false
    },{
      value:3,
      name:"业主查询",
      checked:false
    }]
  }

}
