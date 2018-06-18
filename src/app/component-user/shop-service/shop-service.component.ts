import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-service',
  templateUrl: './shop-service.component.html',
  styleUrls: ['./shop-service.component.scss']
})
export class ShopServiceComponent implements OnInit {

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

  constructor( ) { }

  ngOnInit() {
  	
  }
}
