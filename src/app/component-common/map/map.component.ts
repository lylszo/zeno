import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let BMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @Input() point: Point;//输入的坐标点，格式如最下方interface

  @Output() pointChange = new EventEmitter();

  //坐标点对应的大致地址
  address: string = '请选择';

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.mapInit();
  }

  mapInit(){ 
    // 百度地图API功能
    let map = new BMap.Map("map");

    //获取当前城市
    // function myFun(result){
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   alert("当前定位城市:"+cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);

    //初始化地图、中心点
    map.centerAndZoom(new BMap.Point(this.point.lng, this.point.lat), 11);
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);
    // 添加带有定位的导航控件
    let navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: window['BMAP_ANCHOR_TOP_LEFT'],
      // LARGE类型
      type: window['BMAP_NAVIGATION_CONTROL_LARGE']
    });
    map.addControl(navigationControl);
    // 创建标注
    let marker = new BMap.Marker(this.point);  
    map.addOverlay(marker); 
    //根据经纬度获取地址
    this.getAddress(this.point.lng, this.point.lat);
    //单击添加新标注
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
      this.getAddress(this.point.lng, this.point.lat);
    });
  }

  //根据经纬度获取对应地址
  getAddress(lng, lat){
    window['renderReverse'] = data => {
      this.address = data && data.result && data.result.formatted_address;
    }
    let url = `http://api.map.baidu.com/geocoder/v2/?ak=sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek&location=${lat},${lng}&output=json&callback=renderReverse`;
    this.http.jsonp(url, '').subscribe(data => {
      
    }, error => {
      // console.log(error);
    });
  }

}

interface Point{
  lng: number;
  lat: number;
}