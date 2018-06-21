import { Component, OnInit } from '@angular/core';
import { PermissionService} from '../../service/permission.service';

@Component({
  selector: 'app-module-manage',
  templateUrl: './module-manage.component.html',
  styleUrls: ['./module-manage.component.scss']
})
export class ModuleManageComponent implements OnInit {
  dicMenu: any;
  nextMenu:any;

  constructor(public permit:PermissionService) {
    this.permit.getPermission(0,1,100,(data)=>{
      console.log("permit", data);
      this.dicMenu = data.items

    })
  }

  getNextMenu(index){
    this.permit.getPermission(this.dicMenu[index].code,1,100,(data)=>{
      console.log("next", data);
      this.nextMenu = data.items

    })
  }

  ngOnInit() {

  }
}
