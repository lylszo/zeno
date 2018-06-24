import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';

declare let BMap: any;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {

  @Input() point: Point;//输入的坐标点，格式如最下方interface，若未传入有效的点，即是“请选择”状态

  @Output() pointChange = new EventEmitter();

  @ViewChild('baiduMap') baiduMap: MapComponent;
  
  showMap: boolean = false;//是否显示地图弹框
  pt: Point;

  constructor() { 
    
  }

  ngOnInit() {
    if(this.point){
      this.pt = {
        lng: this.point.lng,
        lat: this.point.lat
      };      
    }
  }

  //打开弹框
  show() {
    if(this.point){//已选择时打开弹框设置中心为选择的经纬度
      this.baiduMap.setCenter();
    }else{//未选择时打开弹框清除上次选择的无效标注
      this.baiduMap.clearMarker();
    }
    this.showMap = !this.showMap; 
  }

  //确定选择改变点
  submit() {
    this.showMap = false;
    if(this.pt){
      this.point = {
        lng: this.pt.lng,
        lat: this.pt.lat
      }
      this.pointChange.emit(this.point);      
    }
  }

}

interface Point{
  lng: number;
  lat: number;
}