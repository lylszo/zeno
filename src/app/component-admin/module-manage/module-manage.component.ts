import { Component, OnInit } from '@angular/core';
import { PermissionService} from '../../service/permission.service';

@Component({
  selector: 'app-module-manage',
  templateUrl: './module-manage.component.html',
  styleUrls: ['./module-manage.component.scss']
})
export class ModuleManageComponent implements OnInit {
  sysMenu:any;
  dicMenu: any;
  funcMenu:any;
  operateMenu:any;
  detail:any;
  map:any = new Map();
  clickDetail:boolean = false;

  constructor(public permit:PermissionService) {
    this.permit.getPermission(0,1,100,(data)=>{
      this.sysMenu = data.items;
      this.getNewMap(this.sysMenu);
      this.clickDetail=true;
      this.detail = this.map.get(this.sysMenu[0].code)
    })
  }

  getSysMenu(code:string,index:number,menu:any,nextMenu:any){
    menu[index].clicked=true;
    if(!nextMenu){
      this.permit.getPermission(code,1,100,(data)=>{
        this.dicMenu = data.items;
        this.getNewMap(this.dicMenu)
      })
    }else{
      this.dicMenu = nextMenu;
      this.getNewMap(this.dicMenu)
    }

  }

  getfuncMenu(code:string,index:number,menu:any,nextMenu:any){
    menu[index].clicked=true;
    if(!nextMenu){
      this.permit.getPermission(code,1,100,(data)=>{
        this.funcMenu = data.items;
        this.getNewMap(this.funcMenu)
      })
    }else{
      this.funcMenu = nextMenu;
      this.getNewMap(this.funcMenu)
    }

  }
  getOperateMenu(code:string,index:number,menu:any,nextMenu:any){
    menu[index].clicked=true;
    if(!nextMenu){
      this.permit.getPermission(code,1,100,(data)=>{
        this.operateMenu = data.items;
        this.getNewMap(this.operateMenu)
      })
    }else{
      this.operateMenu = nextMenu;
      this.getNewMap(this.operateMenu)
    }
  }

  folderNextMenu(index:number, menu:any){
    menu[index].clicked=false;
  }

  getDetail(code){
    this.clickDetail=true;
    this.detail = this.map.get(code)
  }

  getNewMap(arr){
    let len = arr.length;
    for(let i=0; i<len;i++){
      this.map.set(arr[i].code,arr[i])
    }
  }

  ngOnInit() {

  }
}
