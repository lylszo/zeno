import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
	//图片列表
	imgs = [
		{id: 1, url: '../../../assets/imgs/carousel_1.jpg'},
		{id: 2, url: '../../../assets/imgs/carousel_2.jpg'},
		{id: 3, url: '../../../assets/imgs/carousel_3.jpg'},
		{id: 4, url: '../../../assets/imgs/carousel_4.jpg'},
		{id: 5, url: '../../../assets/imgs/carousel_5.jpg'},
	];

	//物业配套
	properties = [
		{code: 1, name: '可明火', value: true},
		{code: 2, name: '380v电压', value: true},
		{code: 3, name: '电梯', value: false},
		{code: 4, name: '暖气', value: false},
		{code: 5, name: '停车位（10个）', value: false},
		{code: 6, name: '上水', value: false},
		{code: 7, name: '排烟', value: false},
		{code: 8, name: '中央空调', value: true},
		{code: 9, name: '网络', value: true},
		{code: 10, name: '天然气', value: false},
		{code: 11, name: '外摆区（50㎡）', value: true},
		{code: 12, name: '排污', value: true},
	];

	serviceItems = [
		{code: 1, name: '可刷卡', value: true},
		{code: 2, name: '包间', value: true},
		{code: 3, name: '外卖', value: false},
		{code: 4, name: '支付宝支付', value: false},
		{code: 5, name: '微信支付', value: false},
		{code: 6, name: 'WIFI', value: false},
		{code: 7, name: '可订座', value: false},
		{code: 8, name: '机打发票', value: true},
		{code: 9, name: '手撕发票', value: true}
	];

	//当前图片的index
	idx: number = 0;
	//图片列表margin-left
	imgLeft: number = 0;

	constructor() { }

	ngOnInit() {
		
	}

	//点击箭头切换图片
	turn(sort, list = []) {
		if(sort == 'left'){
			this.idx == 0 ? this.idx = list.length - 1 : this.idx--;
		}else if(sort == 'right'){
			this.idx == list.length - 1 ? this.idx = 0 : this.idx++;
		}
		if(this.idx == 0){
			this.imgLeft = 0;
		}else if(this.idx > 3){
			this.imgLeft = -(this.idx - 3) * 135;
		}
	}

}
