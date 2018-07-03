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

  assembleData(arr) {
    let tempArr = [];
    let provinceLen = arr.length;

    for (let i = 0; i < provinceLen; i++) {
      if (arr[i].code.toString().length === 2) {
        this.cityList.push(arr[i]);
      } else if (arr[i].code.toString().length === 4) {
        tempArr.push(arr[i]);
      }
    }

    for (let sigle of this.cityList) {
      for (let select of this.selectedCityList) {
        if (sigle.code.toString() === select.code) {
          sigle.checked = true;
        }
      }
    }

    for (let item of this.cityList) {
      item.childs = [];
      for (let temp of tempArr) {
        if (temp.code.toString().substr(0, 2) === item.code.toString()) {
          item.childs.push(temp);
        }
      }
    }

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
    if (item.checked === true) {  //
      if (item.code.toString().length === 2 && item.childs.length > 0) {
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
    item.checked = false;
    item.disabled = false;
    let code = item.code.toString();
    if (code.length === 2) {
      this.cityList[this.cityList.indexOf(item)].checked = false;
    } else if (code.length === 4) {
      let len = this.cityList.length;
      for (let i = 0; i < len; i++) {
        if (code.substr(0, 2) === this.cityList[i].code.toString()) {
          this.cityList[i].childs[this.cityList[i].childs.indexOf(item)].checked = false;
          this.cityList[i].childs[this.cityList[i].childs.indexOf(item)].disable = false;
        }
      }
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
