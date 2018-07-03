import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";

@Component({
  selector: 'app-module-manage',
  templateUrl: './module-manage.component.html',
  styleUrls: ['./module-manage.component.scss']
})
export class ModuleManageComponent implements OnInit {
  allPermit:Array<any>=[];
  sysMenu:Array<any>=[];
  dicMenu: Array<any>=[];
  funcMenu:Array<any>=[];
  operateMenu:Array<any>=[];
  detail:any;
  empty:boolean=true;
  map:any = new Map();
  clickedCode:number;

  constructor(private http:HttpService) {
    let params = {
      // parentCode: 1,
      page: 1,
      pageSize: 100
    };
    this.http.get("permission", params, (data) => {
      this.allPermit = data.items;
      this.seperateData(this.allPermit, this.sysMenu, this.dicMenu, this.funcMenu, this.operateMenu);
      this.addChilds(this.sysMenu,this.dicMenu, this.funcMenu,this.operateMenu);
      if(data.items.length>0){
        this.empty=false;
        this.clickedCode = this.sysMenu[0].code;
        this.detail = this.map.get(this.sysMenu[0].code);
      }else{
        this.empty=true;
      }
    })
  }

  getMenu(index:number,menu:any) {
    menu[index].clicked=true;
  }

  getSysMenu(index:number,menu:any) {
    let thisIndex = index;
    let thisMenu = menu;

    this.getMenu( thisIndex, thisMenu)
  }

  getfuncMenu(index:number,menu:any){
    let thisIndex = index;
    let thisMenu = menu;

    this.getMenu(thisIndex, thisMenu)
  }
  getOperateMenu(index:number,menu:any){
    let thisIndex = index;
    let thisMenu = menu;

    this.getMenu( thisIndex, thisMenu)
  }

  /**
   * 对返回的permissions进行数据处理（划分成arr1,arr2,arr3）
   * @param arr
   * @param arr1
   * @param arr2
   * @param arr3
   */
  private seperateData(arr,arr0, arr1, arr2,arr3){
    let len = arr.length;
    for(let i=0; i<len;i++){
      arr.clicked=false;
      this.map.set(arr[i].code, arr[i]);
      if(arr[i].code.toString().length===2){
        arr0.push(arr[i])
      }else if(arr[i].code.toString().length===4){
        arr1.push(arr[i])
      }else if(arr[i].code.toString().length===6){
        arr2.push(arr[i])
      }else if(arr[i].code.toString().length===8){
        arr3.push(arr[i])
      }
    }
  };

  private addChilds(arr0:Array<any>,arr1:Array<any>, arr2:Array<any>,  arr3:Array<any>){
    let len0 = arr0.length;
    let len1 = arr1.length;
    let len2 = arr2.length;
    let len3 = arr3.length;
    for (let a=0;a < len0; a++) {
      arr0[a].childs = [];
      for (let b=0;b < len1; b++) {
        if(arr0[a].code.toString() === arr1[b].code.toString().substr(0,2)){
          arr0[a].childs.push(arr1[b]);
        }
      }
    }

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

  folderNextMenu(index:number, menu:any){
    menu[index].clicked=false;
  }

  getDetail(code){
    this.clickedCode = code;
    this.detail = this.map.get(code)
  }

  ngOnInit() {

  }
}
