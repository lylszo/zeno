import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-district-manage',
  templateUrl: './district-manage.component.html',
  styleUrls: ['./district-manage.component.scss']
})
export class DistrictManageComponent implements OnInit {

  districtTitle:any;
  provices:any;

  constructor() { }

  ngOnInit() {
    this.districtTitle = ["省/自治区/直辖市","地级市","直辖区/县/县级市","乡/镇/街道"];
    this.provices = [{
      value:11,
      name:"北京"
    },{
      value:11,
      name:"北京"
    },{
      value:11,
      name:"北京"
    }]
  }
}
