import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {

	cities = [
		{code: 1103, name: '深圳'},
		{code: 1101, name: '北京'},
		{code: 1102, name: '上海'},
		{code: 1104, name: '广州'},
	];

	districts = [
		{code: 110302, name: '南山区'},
		{code: 110301, name: '宝安区'},
		{code: 110303, name: '福田区'},
		{code: 110304, name: '罗湖区'},
	];

	businessAreas = [
		{code: 110302, name: '来福士广场'},
		{code: 110301, name: '海岸城'},
		{code: 110303, name: '欢乐颂'},
	];

	descriptions = [
		{code: 1, name: '街道转角'},
		{code: 2, name: '学校'},
		{code: 3, name: '居民区'},
		{code: 4, name: '商业街'},
	];

	//物业配套
	properties = [
		{code: 1, name: '可明火', value: false},
		{code: 2, name: '380v电压', value: false},
		{code: 3, name: '电梯', value: false},
		{code: 4, name: '暖气', value: false},
		{code: 5, name: '停车位（10个）', value: false},
		{code: 6, name: '上水', value: false},
		{code: 7, name: '排烟', value: false},
		{code: 8, name: '中央空调', value: false},
		{code: 9, name: '网络', value: false},
		{code: 10, name: '天然气', value: false},
		{code: 11, name: '外摆区（50㎡）', value: false},
		{code: 12, name: '排污', value: false},
	];

	//提供服务
	serviceItems = [
		{code: 1, name: '可刷卡', value: false},
		{code: 2, name: '包间', value: false},
		{code: 3, name: '外卖', value: false},
		{code: 4, name: '支付宝支付', value: false},
		{code: 5, name: '微信支付', value: false},
		{code: 6, name: 'WIFI', value: false},
		{code: 7, name: '可订座', value: false},
		{code: 8, name: '机打发票', value: false},
		{code: 9, name: '手撕发票', value: false}
	];

	//转让状态
	transferStatus = [
		{code: 1, name: '不转让', value: false},
		{code: 1, name: '转让中', value: false},
		{code: 1, name: '转让成功', value: false},
		{code: 1, name: '租约到期', value: false},
	];

	choose = [{code: 0, name: '---请选择---'}];

  constructor() { }

  ngOnInit() {
  }

}
