import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  isModalShown: boolean;
  @Input() ifResult: boolean;
  @Input() roles: Object;

  menus:Array<any>=[];
  menuItems:Array<any>=[];
  items:Array<any>=[];

  liIndex:number;
  checkedRoleName:string;
  checkedRoleId:number;
  permissions:Array<any> = [];
  itemsPermissions:Array<any> = [];
  allPermissions:Array<any> = [];

  constructor(private http:HttpService) {
    this.isModalShown = false;
    this.ifResult = false;
  }

  // 点击角色的li时，通过角色id获取其permissions
  facusRole(i){
    this.liIndex = i;  // 保存该次选中的index
    this.checkedRoleName = this.roles[i].name;  //  保存最后选中的角色名称
    this.checkedRoleId = this.roles[i].id;
    // 通过角色id获取permissions
    this.getRolePermit();
  }

  getRolePermit() {
    let params = {
      id: this.checkedRoleId,
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

  ngOnInit() {
    // if (!this.role) {
    //   // this.role = this.roles[0];
    // }
  }

  showModal(): void {
    this.isModalShown = true;
    let params = {
      // parentCode: 0,
      page: 1,
      pageSize: 100
    };
    this.http.get("permission", params, (data) => {
      this.allPermissions = data.items || [];
      this.seperateData(this.allPermissions, this.menus, this.menuItems, this.items);
      this.addChilds(this.menus, this.menuItems,this.items);
    });
  }

  onHidden(): void {
    this.isModalShown = false;
  }


  certain() {

  }

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

}
