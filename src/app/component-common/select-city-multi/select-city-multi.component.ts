import { Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-select-city-multi',
  templateUrl: './select-city-multi.component.html',
  styleUrls: ['./select-city-multi.component.scss']
})
export class SelectCityMultiComponent implements OnInit {
  districtData:any;
  dataList:Array<any>=[];
  cityList: Array<any> = [];
  cityMap = new Map();
  selectedCityList:Array<any>;

  constructor() { }
  @Input() showPanel:boolean;
  @Input()
  get selectedCityOut(){
    return this.selectedCityList
  }
  set selectedCityOut(val){
    this.selectedCityList = val;
    this.seletedCityChange.emit(this.selectedCityList)
  }
  @Output() seletedCityChange: EventEmitter<any> = new EventEmitter();

  assembleData(arr){
    let tempArr = [];
    let tempArr1 = [];
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
      }
    }

    for(let item of this.cityList){
      item.childs = [];
      for(let temp of tempArr){
        if(temp.code.toString().indexOf(item.code)!=-1){
          item.childs.push(temp)
        }
      }
    }
  }

  changeChecked(item){
    item.checked = !item.checked;
    if(item.checked===true){
      this.selectedCityList.push(item);
    }else{
      item.checked = !item.checked;
      this.selectedCityList.splice(this.selectedCityList.indexOf(item),1);
      item.checked = !item.checked;
    }
  }

  delete(item){
    this.selectedCityList.splice(this.selectedCityList.indexOf(item),1);
    item.checked=false;
    let code = item.code.toString();
    if(code.length===2){
      this.cityList[this.cityList.indexOf(item)].checked = false;
    }else if(code.length===4){
      let len=this.cityList.length;
      for(let i=0;i<len;i++){
        if(code.indexOf(this.cityList[i].code) !== -1){
          this.cityList[i].childs[this.cityList[i].childs.indexOf(item)].checked = false
        }
      }
    }

  }

  ngOnInit() {
    this.districtData = JSON.parse(localStorage.getItem("district"));

    // this.districtData = [{code: 11, name: "北京", hot: 0, status: 0},
    //   {code: 12, name: "天津", hot: 0, status: 0},
    //   {code: 1101, name: "北京", hot: 0, status: 0},
    //   {code: 1201, name: "天津", hot: 0, status: 0},
    //   {code: 44, name: "广东", hot: 0, status: 0},
    //   {code: 4401, name: "深圳", hot: 0, status: 0},
    //   {code: 440101, name: "罗湖", hot: 0, status: 0}
    //   ];

    let len = this.districtData.length;
    for(let i=0;i<len;i++){
      if(this.districtData[i].code.toString().length <= 4){ // 筛选出国家，省和市
        this.dataList.push(this.districtData[i]);
      }
    }
    this.assembleData(this.dataList);
  }

}
