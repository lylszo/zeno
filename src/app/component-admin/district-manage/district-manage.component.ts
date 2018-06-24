import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-district-manage',
  templateUrl: './district-manage.component.html',
  styleUrls: ['./district-manage.component.scss']
})
export class DistrictManageComponent implements OnInit {

  districtTitle:any;
  districtData:any;
  dataList:Array<any>=[];
  cityList:Array<any>=[];

  constructor() { }

  assembleData(arr){
    let tempArr = [];
    let tempArr1 = [];
    let tempArr2 = [];
    let provinceLen = arr.length;

    // console.time("test1");
    // for(let i=0; i < provinceLen; i++ ){
    //   if(arr[i].code.toString().length===2){
    //     arr[i].childs=[];
    //     this.cityMap.set(arr[i].code,arr[i]);
    //   }else if(arr[i].code.toString().length===4){
    //     tempArr1.push(arr[i])
    //   }
    // }
    //
    // this.cityMap.forEach((value, key) => {
    //   for (let temp of tempArr1) {
    //     if (temp.code.toString().indexOf(key) != -1) {
    //       value.childs.push(temp)
    //     }
    //   }
    // });
    // console.log(this.cityMap,"map");
    // console.timeEnd("test1");

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
    console.log(this.cityList,"list1111")
  }

  ngOnInit() {
    this.districtTitle = ["省/自治区/直辖市","地级市","直辖区/县/县级市","乡/镇/街道"];
    this.districtData = JSON.parse(localStorage.getItem("district"));

    // this.districtData = [{code: 11, name: "北京", hot: 0, status: 0},
    //   {code: 12, name: "天津", hot: 0, status: 0},
    //   {code: 1101, name: "北京", hot: 0, status: 0},
    //   {code: 1201, name: "天津", hot: 0, status: 0},
    //   {code: 44, name: "广东", hot: 0, status: 0},
    //   {code: 4401, name: "深圳", hot: 0, status: 0},
    //   {code: 440101, name: "罗湖", hot: 0, status: 0}];

    let len = this.districtData.length;
    for(let i=0;i<len;i++){
      if(this.districtData[i].code.toString().length <= 4){ // 筛选出国家，省和市
        this.dataList.push(this.districtData[i]);
      }
    }
    this.assembleData(this.dataList);
  }
}
