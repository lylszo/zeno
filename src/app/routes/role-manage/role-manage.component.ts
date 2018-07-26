import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { TipPopService} from '../../service/tipPop.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {

  allPermissions:Array<any>=[];  // 全部的permissions
  roles:any;
  menus:Array<any>=[];
  menuItems:Array<any>=[];
  items:Array<any>=[];
  addRole:any;
  addClicked:boolean=false;
  saved:boolean=false;
  liindex:number=0;  // 控制侧边的按钮点击

  checkedRoleName:string='';
  thisItemId:number=0;
  itemsPermissions:Array<any> = [];  // 通过角色id获取的permissions
  permissions:Array<any>=[];  // 选中的permission

  constructor(private http:HttpService, public tip:TipPopService) {
    let params = {
      // parentCode: 0,
      page: 1,
      pageSize: 100
    };
    this.http.get("permission", params, (data) => {
      this.allPermissions = data.items || [];
      this.seperateData(this.allPermissions, this.menus, this.menuItems, this.items);
      this.addChilds(this.menus, this.menuItems,this.items)
    });
    let roleParams = {
      id: 0,
      name: '',
      page: 1,
      pageSize: 100
    };
    this.http.get("role", roleParams, (data) => {
      this.roles = data.items
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
      let params = {
        name: this.addRole,
        permissions: []
      };
      this.http.post("role", params, (data) => {
        this.tip.setValue("新增角色名称成功",false);

        // 调用成功之后更新角色列表
        let newParams = {
          id: 0,
          name: '',
          page: 1,
          pageSize: 100
        };
        this.http.get("role", newParams, (data) => {
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
  // 保存修改的角色
  saveModify(invalid,index,event){
    if(invalid){
      this.roles[index].saved=true;
    }else{
      this.roles[index].clicked=false;
      let updateParams = {
        name: this.roles[index].name,
        permissions: []
      };
      this.http.put("role/" + this.roles[index].id, updateParams, (data) => {
        this.tip.setValue("修改角色名称成功",false);

        // 调用成功之后更新角色列表
        let params = {
          id: 0,
          name: '',
          page: 1,
          pageSize: 100
        };
        this.http.get("role", params, (data) => {
          this.roles = data.items
        })
      })
    }
  }
  // 取消修改角色
  cancelModify(index){
    this.roles[index].clicked = false;
  }
   // 点击角色的li时，通过角色id获取其permissions
  facusRole(i){
    this.roles[this.liindex].liclicked = false;  // 取消上一次勾选状态样式
    this.roles[i].liclicked = true;  // 选中
    this.liindex = i;  // 保存该次选中的index
    this.checkedRoleName = this.roles[i].name;  //  保存最后选中的角色名称
    this.thisItemId = this.roles[i].id;
    // 通过角色id获取permissions
    this.getRolePermit();
  }

  getRolePermit() {
    let params = {
      id: this.thisItemId,
      name: this.checkedRoleName,
      page: 1,
      pageSize: 100
    };
    this.permissions = [];
    this.http.get("role", params, (data) => {
      this.itemsPermissions = data.items[0].permissions || [];
      let alllen = this.allPermissions.length || 0;
      let itemlen = this.itemsPermissions.length || 0;

      // 对后台返回的permission进行打钩，并添加到perssions里面
      if(alllen){
        for(let i=0;i<alllen;i++){
          this.allPermissions[i].checked = false;
          if(itemlen){
            for(let j=0;j<itemlen;j++){
              if(this.allPermissions[i].code === this.itemsPermissions[j]){
                this.allPermissions[i].checked = true;
              }
            }
          }
        }
      }
      for(let j=0;j<itemlen;j++){
        this.permissions.push(this.itemsPermissions[j]);
      }
    })
  }
  /**
   * end
   */

  /**
   * 对返回的permissions进行数据处理（划分成arr1,arr2,arr3）
   * @param arr
   * @param arr1
   * @param arr2
   * @param arr3
   */
  private seperateData(arr, arr1, arr2,arr3){
    let len = arr.length;
    for(let i=0; i<len;i++){
      if(arr[i].code.toString().length===4){
        arr1.push(arr[i])
      }else if(arr[i].code.toString().length===6){
        arr2.push(arr[i])
      }else if(arr[i].code.toString().length===8){
        arr3.push(arr[i])
      }
    }
  };

  private addChilds(arr1:Array<any>, arr2:Array<any>,  arr3:Array<any>){
    let len1 = arr1.length;
    let len2 = arr2.length;
    let len3 = arr3.length;
    for (let i=0;i < len1; i++) {
      arr1[i].childs = [];
      for (let j=0;j < len2; j++) {
        if(arr1[i].code.toString() === arr2[j].code.toString().substr(0,4)){
          arr1[i].childs.push(arr2[j])
        }
      }
    }
    for ( let j=0; j < len2; j++){
      arr2[j].childs = [];
      for (let k=0; k < len3; k++){
        if(arr2[j].code.toString() === arr3[k].code.toString().substr(0,6)){
          arr2[j].childs.push(arr3[k])
        }
      }
    }
  }

  // 点击checkbox事件
  changeChecked(item){
    item.checked = !item.checked;
    if(item.checked){
      if(item.code.toString().length===8){
        let that = this;
        this.menuItems.forEach(function (value) {
          if(value.code.toString()===item.code.toString().substr(0,6) && !value.checked){
            value.checked = true;
            that.permissions.push(value.code)
          }
        })
      }
      this.permissions.push(item.code)
    }else{
      item.checked = !item.checked;
      this.permissions.splice(this.permissions.indexOf(item.code), 1);
      item.checked = !item.checked;
    }
  }

  // 提交permissions的修改
  submit(){
    let per = JSON.stringify(this.permissions);
    let itemper = JSON.stringify(this.itemsPermissions);
    if(per === itemper){
      this.permissions = [];
    }
    let updateParams = {
      name: this.checkedRoleName,
      permissions: this.permissions
    };
    this.http.put("role/" + this.thisItemId, updateParams, (data) => {
      this.tip.setValue("修改权限成功",false)
    })
  }

  // 取消修改角色权限
  cancelSubmit(){
    this.getRolePermit()
  }

  ngOnInit() {
  }
}
