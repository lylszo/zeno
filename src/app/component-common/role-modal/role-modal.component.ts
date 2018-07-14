import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {TipPopService} from '../../service/tipPop.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  isModalShown: boolean;
  @Input() ifResult: boolean;
  @Input() roles: Array<any> = [];
  @Input() userId: any;
  @Input() teamId: any;
  @Input() addUser: any;

  @Output() getRole: EventEmitter<any> = new EventEmitter();
  @Output() rolesChange: EventEmitter<any> = new EventEmitter();

  menus: Array<any> = [];
  menuItems: Array<any> = [];
  items: Array<any> = [];
  allRoles: Array<any> = [];

  liIndex: number;
  checkedRoleName: string;
  checkedRoleId: number;
  permissions: Array<any> = [];
  itemsPermissions: Array<any> = [];
  allPermissions: Array<any> = [];

  constructor(private http: HttpService, private tip: TipPopService) {
    this.isModalShown = false;
    this.ifResult = false;
  }

  // 点击角色的li时，通过角色id获取其permissions
  facusRole(i) {
    this.liIndex = i;  // 保存该次选中的index
    this.checkedRoleName = this.allRoles[i].name;  //  保存最后选中的角色名称
    this.checkedRoleId = this.allRoles[i].id;
    // 通过角色id获取permissions
    this.getRolePermit();
  }

  getRolePermit() {
    this.permissions = [];
    let params = {
      id: this.checkedRoleId,
      name: this.checkedRoleName,
      page: 1,
      pageSize: 100
    };
    this.http.get('role', params, (data) => {
      this.itemsPermissions = data.items[0].permissions || [];
      let alllen = this.allPermissions.length || 0;
      let itemlen = this.itemsPermissions.length || 0;

      // 对后台返回的permission进行打钩，并添加到perssions里面
      if (alllen) {
        for (let i = 0; i < alllen; i++) {
          this.allPermissions[i].checked = false;
          if (itemlen) {
            for (let j = 0; j < itemlen; j++) {
              if (this.allPermissions[i].code === this.itemsPermissions[j]) {
                this.allPermissions[i].checked = true;
              }
            }
          }
        }
      }
      for (let j = 0; j < itemlen; j++) {
        this.permissions.push(this.itemsPermissions[j]);
      }
    });
  }

  ngOnInit() {
  }

  showModal(): void {
    this.isModalShown = true;
    this.itemsPermissions = [];
    this.allPermissions = [];
    this.allRoles = [];
    this.menus = [];
    this.menuItems = [];
    this.items = [];
    let params = {
      // parentCode: 0,
      page: 1,
      pageSize: 100
    };
    this.http.get('permission', params, (data) => {
      this.allPermissions = data.items || [];
      this.seperateData(this.allPermissions, this.menus, this.menuItems, this.items);
      this.addChilds(this.menus, this.menuItems, this.items);
    });

    let roleParams = {
      id: 0,
      name: '',
      page: 1,
      pageSize: 100
    };
    this.http.get('role', roleParams, (data) => {
      this.allRoles = data.items;
      if (this.roles && this.roles.length) {
        this.checkedRoleName = this.roles[0].name;
        this.checkedRoleId = this.roles[0].id;
        this.getRolePermit();
      }
    });
  }

  onHidden(): void {
    this.isModalShown = false;
  }


  submit() {
    if (this.userId) {
      let params = {
        roles: [this.checkedRoleId]
      };
      this.http.put('user/' + this.userId, params, (data) => {
        this.tip.setValue('设置角色成功', false);
        this.outputRole();
      });
    } else if (this.teamId) {
      let params = {
        roles: [this.checkedRoleId]
      };
      this.http.put('team/' + this.teamId, params, (data) => {
        this.tip.setValue('设置角色成功', false);
        this.outputRole();
      });
    } else if (this.addUser) {
      this.getRole.emit({roleId: this.checkedRoleId});
      this.isModalShown = false;
    }
  }

  delectRole(){
    this.checkedRoleName='';
    this.checkedRoleId = null;
    this.getRole.emit({roleId: this.checkedRoleId});
  }

  outputRole() {
    this.roles = [{name: this.checkedRoleName, id: this.checkedRoleId, permissions: this.permissions}];
    this.rolesChange.emit(this.roles);
    this.isModalShown = false;
  }

  /**
   * 对返回的permissions进行数据处理（划分成arr1,arr2,arr3）
   * @param arr
   * @param arr1
   * @param arr2
   * @param arr3
   */
  private seperateData(arr, arr1, arr2, arr3) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (arr[i].code.toString().length === 4) {
        arr1.push(arr[i]);
      } else if (arr[i].code.toString().length === 6) {
        arr2.push(arr[i]);
      } else if (arr[i].code.toString().length === 8) {
        arr3.push(arr[i]);
      }
    }
  };

  private addChilds(arr1: Array<any>, arr2: Array<any>, arr3: Array<any>) {
    let len1 = arr1.length;
    let len2 = arr2.length;
    let len3 = arr3.length;
    for (let i = 0; i < len1; i++) {
      arr1[i].childs = [];
      for (let j = 0; j < len2; j++) {
        if (arr1[i].code.toString() === arr2[j].code.toString().substr(0, 4)) {
          arr1[i].childs.push(arr2[j]);
        }
      }
    }
    for (let j = 0; j < len2; j++) {
      arr2[j].childs = [];
      for (let k = 0; k < len3; k++) {
        if (arr2[j].code.toString() === arr3[k].code.toString().substr(0, 6)) {
          arr2[j].childs.push(arr3[k]);
        }
      }
    }
  }

}
