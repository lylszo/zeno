import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {

  @Input() point: Point;//输入的坐标点，格式如最下方interface
  @Input() clickable: boolean = true;//是否允许点击修改位置，默认为true，详情页面禁止修改位置时需设置为false

  @Output() pointChange = new EventEmitter();

  address: string = '请点击地图选择位置';//坐标点对应的地址
  map;//初始化map
  key: string = '';//搜索关键字
  mapId;//地图元素的id

  constructor() { 
    this.mapId = "map" + new Date().getTime();
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.initMap();
  }

  //显示地图
  initMap(){ 
    let map = new BMap.Map(this.mapId);
    //暴露map
    this.map = map;
    //初始化地图、中心点
    if(this.point){
      map.centerAndZoom(new BMap.Point(this.point.lng, this.point.lat), 18);
      this.getAddress(this.point);       
      // 创建标注
      let marker = new BMap.Marker(this.point);  
      map.addOverlay(marker); 
    }else{
      //获取当前城市
      let myCity = new BMap.LocalCity();
      myCity.get(rs => {
        let cityName = rs.name;
        map.centerAndZoom(cityName, 18);
      });
    }

    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);
    // 添加导航控件
    let navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: window['BMAP_ANCHOR_TOP_RIGHT'],
      // LARGE类型
      type: window['BMAP_NAVIGATION_CONTROL_LARGE']
    });
    map.addControl(navigationControl);
    //添加比例尺控件
    var scaleCtrl = new BMap.ScaleControl({anchor: window['BMAP_ANCHOR_BOTTOM_LEFT'],offset: new BMap.Size(100,23)});
    map.addControl(scaleCtrl);
    //单击添加新标注
    if(this.clickable){
      map.addEventListener("click", e => {
        //记录点击位置
        let newPoint = {
          lng: e.point.lng,
          lat: e.point.lat
        }
        //清除之前标注
        map.clearOverlays();         
        //添加新标注
        let newMarker = new BMap.Marker(newPoint);
        map.addOverlay(newMarker);
        this.point = newPoint;
        this.pointChange.emit(this.point);
        //地址信息跟随经纬度变化
        this.getAddress(this.point);
      });      
    }
  }

  //逆地址解析
  getAddress(point){
    let geoc = new BMap.Geocoder(); 
    let pt = new BMap.Point(point.lng, point.lat);
    geoc.getLocation(pt, rs => {
      let addComp = rs.addressComponents;
      this.address = addComp.city + addComp.district + addComp.street + addComp.streetNumber;
    }); 
  }

  //搜索地址
  searchMap(){
    let local = new BMap.LocalSearch(this.map, {
      renderOptions:{map: this.map}
    });
    local.search(this.key);
  }

  //清除添加的无效标注（用在map-modal组件）
  clearMarker() {
    this.map.clearOverlays(); 
    this.point = undefined;
    this.address = '请点击地图选择位置';
    //设置本地城市为中心点
    let myCity = new BMap.LocalCity();
    myCity.get(rs => {
      let cityName = rs.name;
      this.map.setCenter(cityName);
    });
  }

  //设置已选点为中心位置（用在map-modal组件）
  setCenter(point) {
    if(point){
      this.clearMarker();
      //创建标注
      let marker = new BMap.Marker(point);  
      this.map.addOverlay(marker); 
      this.map.centerAndZoom(new BMap.Point(point.lng, point.lat), 18); 
      console.log(point.lng, point.lat);
    }else {
      this.map.centerAndZoom(new BMap.Point(this.point.lng, this.point.lat), 18); 
    }
  }

}

interface Point{
  lng: number;//经度
  lat: number;//纬度
}