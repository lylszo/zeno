import {Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-select-city-multi',
  templateUrl: './select-city-multi.component.html',
  styleUrls: ['./select-city-multi.component.scss']
})
export class SelectCityMultiComponent implements OnInit {
  districtData: any;
  dataList: Array<any> = [];
  cityList: Array<any> = [];
  selectedCityList: Array<any>;

  constructor() {
  }

  @Input() showPanel: boolean;

  @Input()
  get selectedCityOut() {
    return this.selectedCityList;
  }

  set selectedCityOut(val) {
    this.selectedCityList = val;
    this.seletedCityChange.emit(this.selectedCityList);
  }

  @Output() seletedCityChange: EventEmitter<any> = new EventEmitter();

  // 处理省和市的数据
  assembleData(arr) {
    let tempArr = [];
    let provinceLen = arr.length;
    // 拿出省和市
    for (let i = 0; i < provinceLen; i++) {
      if (arr[i].code.toString().length === 2) {
        this.cityList.push(arr[i]);
      } else if (arr[i].code.toString().length === 4) {
        tempArr.push(arr[i]);
      }
    }
    // 对已选中的省份和城市标志checked
    let selectCityStr = JSON.stringify(this.selectedCityList);
    for (let sigle of this.cityList) {
      if(selectCityStr.indexOf(sigle.name)!==-1){
        sigle.checked=true
      }
      // for (let select of this.selectedCityList) {
      //   if (sigle.code.toString() === select.code.toString()) {
      //     sigle.checked = true;
      //   }
      // }
    }
    // 省、市形成父级和子级关系
    for (let item of this.cityList) {
      item.childs = [];
      for (let temp of tempArr) {
        if (temp.code.toString().substr(0, 2) === item.code.toString()) {
          item.childs.push(temp);
        }
      }
    }
    // 省已被选中，下面的市级则不能被勾选，标记disable
    for (let item of this.cityList) {
      if (item.code.toString().length === 2 && item.checked === true && item.childs.length) {
        for (let i of item.childs) {
          i.disable = true;
        }
      }
    }
  }

  changeChecked(item) {
    item.checked = !item.checked;
    if (item.checked === true) {
      if (item.code.toString().length === 2 && item.childs.length > 0) {   // 若下面的市有被选中，则取消选中
        let len = item.childs.length;
        for (let i = 0; i < len; i++) {
          if (item.childs[i].checked) {
            this.selectedCityList.splice(this.selectedCityList.indexOf(item.childs[i]), 1);
            item.childs[i].checked = false;
          }
          item.childs[i].disable = true; // 含有childs的省份被选中时，下面的市都会被选中，且不可点击
        }
      }
      this.selectedCityList.push(item);
    } else { // 含有childs的省份不被选中时，下面的市都会被取消
      item.checked = !item.checked;
      this.selectedCityList.splice(this.selectedCityList.indexOf(item), 1);
      item.checked = !item.checked;

      if (item.code.toString().length === 2 && item.childs.length > 0) {
        let len = item.childs.length;
        for (let i = 0; i < len; i++) {
          item.childs[i].disable = false; // 含有childs的省份被选中时，下面的市都会被选中，且不可点击
        }
      }
    }
  }

  delete(item) {
    this.selectedCityList.splice(this.selectedCityList.indexOf(item), 1);
    let code = item.code;

    if (code.toString().length === 2) {  // 删除的是省，则下面的市要变成可点击
      let index = this.cityList.findIndex(x => x.code === code);
      this.cityList[index].checked = false;
      if (this.cityList[index].childs.length) {
        let len = this.cityList[index].childs.length;
        for (let i = 0; i < len; i++) {
          this.cityList[index].childs[i].checked = false;
          this.cityList[index].childs[i].disable = false;
        }
      }
    } else if (code.toString().length === 4) {  // 删除的市
      let parentIndex = this.cityList.findIndex(x => x.code.toString() === code.toString().substr(0, 2));
      let childIndex = this.cityList[parentIndex].childs.findIndex(x => x.code === code);
      this.cityList[parentIndex].childs[childIndex].checked = false;
      this.cityList[parentIndex].childs[childIndex].disable = false;
    }

  }

  showPanelOr() {
    this.showPanel = !this.showPanel;
  }

  ngOnInit() {
    this.districtData = JSON.parse(localStorage.getItem('district'));
    let len = this.districtData.length;
    for (let i = 0; i < len; i++) {
      if (this.districtData[i].code.toString().length <= 4) { // 筛选出国家，省和市
        this.dataList.push(this.districtData[i]);
      }
    }
    this.assembleData(this.dataList);
  }

  hidePanel() {
    this.showPanel = false;
  }

}
