import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";

@Component({
  selector: 'app-district-manage',
  templateUrl: './district-manage.component.html',
  styleUrls: ['./district-manage.component.scss']
})
export class DistrictManageComponent implements OnInit {

  districtTitle:any;
  districtData:any;
  provinces:Array<any>=[];
  cityList:Array<any>=[];
  districts:Array<any>=[];
  towns:Array<any>=[];

  constructor(private http:HttpService) { }

  assembleData(arr){
    let tempArr = [];
    let tempArr1 = [];
    let tempArr2 = [];
    let provinceLen = arr.length;

    for(let i=0; i < provinceLen; i++ ){
      if(arr[i].code.toString().length===2){
        this.cityList.push(arr[i]);
      }else if(arr[i].code.toString().length===4){
        tempArr.push(arr[i])
      }else if(arr[i].code.toString().length===6){
        tempArr2.push(arr[i])
      }
    }

    for(let city of tempArr){
      city.childs = [];
      for(let district of tempArr2){
        if(district.code.toString().indexOf(city.code) !=-1){
          city.childs.push(district)
        }
      }
    }

    for(let province of this.cityList){
      province.childs = [];
      for(let city of tempArr){
        if(city.code.toString().indexOf(province.code)!=-1){
          province.childs.push(city)
        }
      }
    }
  }

  getCity(item, num, arr){
    arr.forEach(function (value) {
      value.clicked = false;
    });
    this.http._get("district", {parent_id: item.code}, (data) =>{
      switch (num){
        case 1:
          this.cityList = data;
          break;
        case 2:
          this.districts = data;
          break;
        case 3:
          this.towns = data;
          break;
      }
      item.clicked = true;
    })
  }

  ngOnInit() {
    this.districtTitle = ["省/自治区/直辖市","地级市","直辖区/县/县级市","乡/镇/街道"];
    // this.districtData = JSON.parse(localStorage.getItem("district"));
    this.http._get("district", {parent_id: '0'}, (data) => {
      this.provinces = data;
    });

    // let len = this.districtData.length;
    // for(let i=0;i<len;i++){
    //   if(this.districtData[i].code.toString().length <= 4){ // 筛选出国家，省和市
    //     this.dataList.push(this.districtData[i]);
    //   }
    // }
    // this.assembleData(this.dataList);
  }
}
