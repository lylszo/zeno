import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from "../../shared/service/http.service";
import { enableProdMode } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
enableProdMode();

@Component({
	selector: 'app-choose-district',
	templateUrl: './choose-district.component.html',
	styleUrls: ['./choose-district.component.scss']
})
export class ChooseDistrictComponent implements OnInit, OnChanges {
	//当前城市
	currentCity;
	//初始化数据
	initItem = {code: 0, name: '---请选择---'};
	cityList = [];//为当前用户的服务城市，如果获取不到就默认是深圳
	areaList = [{code: 0, name: '---请选择---'}];
	streetList = [{code: 0, name: '---请选择---'}];
	cityCode;
	areaCode = 0;
	streetCode = 0;

	@Input() selectedCode;//双向绑定已选区域code
	@Input() defaultCode;//默认区域
	@Input() isDetail: boolean;//双向绑定，是否选择了最详细的区域,如果有可选区域或者商圈但是没有选，则值为false，否则为true

  	@Output() selectedCodeChange = new EventEmitter();
  	@Output() isDetailChange = new EventEmitter();

	constructor(private http: HttpService, private common: CommonService) { }

	ngOnInit() {
		this.init();
		if(this.defaultCode){
			this.setDefaultCity();
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes.defaultCode){
			this.setDefaultCity();
		}
	}

	//初始化数据
	init() {
		//获取用户服务区域中的城市列表，如果没有默认为深圳
		this.common.getCurrentCity(data => {
			let arr = [];
			arr.push(data);
			this.cityList = arr;
			this.getArea(this.cityList[0].code);
			this.cityCode = this.cityList[0].code;
		})
	}

	//设置默认区域
	setDefaultCity() {
		if(!this.defaultCode){
			return;
		}
		let str = this.defaultCode.toString();
		if(str.length >= 4) {
			let cityCode = +this.defaultCode.toString().slice(0, 4);
			this.cityCode = cityCode;
			this.getArea(cityCode);
		}
		if(str.length >= 6) {
			let areaCode = +this.defaultCode.toString().slice(0, 6);
			this.areaCode = areaCode;
			this.getStreet(areaCode);
		}
		if(str.length >= 8) {
			let streetCode = +this.defaultCode.toString().slice(0, 8);
			this.streetCode = streetCode;
			this.chooseStreet(streetCode);
		}
	}

	//获取城市的区域
	getArea(cityCode) {
		if(cityCode && cityCode != 0) {
			this.http._get("district", {parent_id: cityCode}, (data) => {
				let list = data.unshift(this.initItem);
				this.areaList = data;
				this.detailOrNot();
		    });			
		}else {
			this.areaList = [{code: 0, name: '---请选择---'}];
			this.streetList = [{code: 0, name: '---请选择---'}];
			this.detailOrNot();
		}
		this.areaCode = 0;
		this.streetCode = 0;
		this.selectedCode = cityCode;
		this.selectedCodeChange.emit(+cityCode);
		this.detailOrNot();
	}

	//获取区域的商圈街道
	getStreet(areaCode) {
		if(areaCode && areaCode != 0) {
			this.http._get("district", {parent_id: areaCode}, (data) => {
				let list = data.unshift(this.initItem);
				this.streetList = data;
				this.detailOrNot();
		    });			
		}else {
			this.streetList = [{code: 0, name: '---请选择---'}];
			this.detailOrNot();
		}
		this.streetCode = 0;
		this.selectedCode = +areaCode || this.cityCode;
		this.selectedCodeChange.emit(+this.selectedCode);
		this.detailOrNot();
	}

	//选择商圈街道
	chooseStreet(streetCode) {
		this.selectedCode = +streetCode || +this.areaCode || +this.cityCode;
		this.selectedCodeChange.emit(+this.selectedCode);
		this.detailOrNot();
	}

	//判断是否选择了最详细的地址
	detailOrNot() {
		if((this.areaList.length > 1 && !+this.areaCode) || (this.streetList.length > 1 && !+this.streetCode)) {
			this.isDetail = false;
		}else {
			this.isDetail = true;
		}
		this.isDetailChange.emit(this.isDetail);
	}

}
