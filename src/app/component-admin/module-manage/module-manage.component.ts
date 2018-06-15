import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-manage',
  templateUrl: './module-manage.component.html',
  styleUrls: ['./module-manage.component.scss']
})
export class ModuleManageComponent implements OnInit {
  dicMenu:any;

  constructor() { }

  ngOnInit() {
    this.dicMenu=[{
      value:1,
      name:"服务大厅"
    },{
      value:2,
      name:"用户管理"
    },{
      value:3,
      name:"团队管理"
    },{
      value:4,
      name:"财务管理"
    }]
  }


}
