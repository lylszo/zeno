import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { CookieService } from 'ngx-cookie-service';

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
	cityList = [{code: 4403, name: '深圳'}];
	areaList = [{code: 0, name: '---请选择---'}];
	streetList = [{code: 0, name: '---请选择---'}];
	cityCode = 4403;
	areaCode = 0;
	streetCode = 0;

 	@Input() lyl;//选中的区域code（也可以表示默认的区域code）,可以是城市、区域、商圈的code

  	@Output() lylChange = new EventEmitter();

	constructor(private http: HttpService, private cookie: CookieService) { }

	ngOnInit() {
		//初始化城市下拉框，默认只有深圳，登录后为服务区域中的城市
		let defaultCode = this.cityList[0].code
		this.getArea(defaultCode);
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	getArea(cityCode) {
		if(cityCode) {
			this.http._get("district", {parent_id: cityCode}, (data) => {
				let list = data.unshift(this.initItem);
				this.areaList = data;
		    });			
		}else {
			this.areaList = [{code: 0, name: '---请选择---'}];
			this.streetList = [{code: 0, name: '---请选择---'}];
		}
		this.areaCode = 0;
		this.streetCode = 0;
		this.lyl = cityCode;
		this.lylChange.emit(cityCode);
	}

	getStreet(areaCode) {
		if(areaCode) {
			this.http._get("district", {parent_id: areaCode}, (data) => {
				let list = data.unshift(this.initItem);
				this.streetList = data;
		    });			
		}else {
			this.streetList = [{code: 0, name: '---请选择---'}];
		}
		this.streetCode = 0;
		this.lyl = areaCode;
		if(areaCode){
			this.lylChange.emit(areaCode);
		}
	}

	chooseStreet(streetCode) {
		this.lyl = streetCode;
			console.log('fdslf');
		if(streetCode){
			this.lylChange.emit(streetCode);
		}
	}

}
