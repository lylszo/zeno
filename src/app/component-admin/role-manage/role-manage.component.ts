import { Component, OnInit } from '@angular/core';
import { PermissionService} from '../../service/permission.service';
import { RoleService} from '../../service/role.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss'],
  providers:[PermissionService,RoleService]
})
export class RoleManageComponent implements OnInit {

  roles:any;
  menus:any;
  menuItems:any;
  items:any;
  addRole:any;
  addClicked:boolean=false;
  saved:boolean=false;
  liindex:number=0;  // 控制侧边的按钮点击
  checkedRoleName:string='';
  constructor(public permit:PermissionService, public role:RoleService) {
    this.permit.getPermission(0,1,100,(data) => {
      console.log("permit", data);
      // this.menus=data.items;
      // this.menus = [{value:101, name:"团队管理"}, {value:102, name:"用户管理"},{value:103, name:"业务服务大厅"}];
      // this.menuItems = [{value:1011, name:"团队管理", checked:false},{value:1021, name:"用户管理", checked:false},{
      //   value:1031, name:"业主管理", checked:false}];
      // this.items = [{value:10111, name:"团队创建", checked:false},{value:10211, name:"用户编辑", checked:false},{
      //   value:10311, name:"业主查询", checked:false}]
    });
    this.role.getRole(0,'',1,100,(data) => {
      console.log("role", data);
      // this.roles = [{value:1, name:"自营业务角色"},{value:2, name:"城市管理角色"},{
      //   value:3, name:"大区管理角色"},{value:4, name:"财务管理角色"},{value:5, name:"认识角色"}];
      this.roles=data.items
    })
  }

  /**
   * 新增角色
   * start
   */
  addclick(){
    this.addClicked=true;
  }
  ceateRole(valid){
    if(!valid){
      this.saved=true;
    }else{
      this.role.createRole( this.addRole, [], (data) => {
        console.log(data);

        // 调用成功之后更新角色列表
        this.role.getRole(0,'',1,100,(data) => {
          console.log("role", data);
          this.roles = data.items
        })
      });
      this.addRole='';
      this.addClicked=false;
    }
  }
  cancelRole(){
    this.addClicked=false
  }
  /**
   * end
   */

  /**
   * 修改角色
   * start
   * @param index
   */
  modifyRole(index){
    this.roles[index].clicked=true;
  }
  saveModify(invalid,index,event){
    if(invalid){
      this.roles[index].saved=true;
    }else{
      // this.roles[index].name = this.roles[index].addRole;
      console.log(this.roles[index].name,"name");
      this.roles[index].clicked=false;
      this.role.updateRole(this.roles[index].id, this.roles[index].name, [],
        (data) => {
        console.log(data,"updateRole");

        // 调用成功之后更新角色列表
        this.role.getRole(0,'',1,100,(data) => {
          console.log("role", data);
          this.roles = data.items
        })
      })
    }
  }
  cancelModify(index){
    this.roles[index].clicked = false;
  }

  facusli(i){
    this.roles[this.liindex].liclicked = false;
    this.roles[i].liclicked = true;
    this.liindex = i;
    this.checkedRoleName = this.roles[i].name;  //  保存最后选中的角色名称
  }
  /**
   * end
   */

  private addChilds(arr1:Array<any>, len1:number, arr2:Array<any>, len2:number, arr3:Array<any>, len3:number){
    for (let i=0;i < len1; i++) {
      arr1[i].childs = [];
      for (let j=0;j < len2; j++) {
        if(arr1[i].value.toString() === arr2[j].value.toString().substr(0,4)){
          arr1[i].childs.push(arr2[j])
        }
      }
    }
    for ( let j=0; j < len2; j++){
      arr2[j].childs = [];
      for (let k=0; k < len3; k++){
        if(arr2[j].value.toString() === arr3[k].value.toString().substr(0,6)){
          arr2[j].childs.push(arr3[k])
        }
      }
    }
    console.log(arr1,"arr1")
  }

  ngOnInit() {
    // this.roles = [{value:1, name:"自营业务角色", clicked:false}, {value:2, name:"城市管理角色", clicked:false}, {
    //   value:3, name:"大区管理角色", clicked:false}, {value:4, name:"财务管理角色", clicked:false},
    //   {value:5, name:"认识角色", clicked:false}];
    this.menus = [{value:1010, name:"团队管理"}, {value:1020, name:"用户管理"}, {value:1030, name:"业务服务大厅"}];
    this.menuItems = [{value:101001, name:"团队管理", checked:false}, {value:102001, name:"用户管理", checked:false}, {
      value:103001, name:"业主管理", checked:false}];
    this.items = [{value:10100101, name:"团队创建1", checked:false}, {value:10100102, name:"团队创建2", checked:false},
      {value:10100103, name:"团队创建3", checked:false}, {value:10200101, name:"用户编辑1", checked:false},
      {value:10200102, name:"用户编辑2", checked:false}, {value:10200103, name:"用户编辑3", checked:false}, {
      value:10300101, name:"业主查询", checked:false}];
    let menuLen = this.menus.length;
    let menuItemsLen = this.menuItems.length;
    let itemsLen = this.items.length;
    this.addChilds(this.menus, menuLen, this.menuItems, menuItemsLen, this.items, itemsLen);
  }
}
