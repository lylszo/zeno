import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-choose-district',
	templateUrl: './choose-district.component.html',
	styleUrls: ['./choose-district.component.scss']
})
export class ChooseDistrictComponent implements OnInit {
	//当前城市
	currentCity;
	//初始化数据
	initItem = {code: 0, name: '---请选择---'};
	areaList = [{code: 0, name: '---请选择---'}];
	streetList = [{code: 0, name: '---请选择---'}];
	areaCode = 0;
	streetCode = 0;

	constructor(private http: HttpService, private cookie: CookieService) { }

	ngOnInit() {
		//获取当前城市
		this.currentCity = JSON.parse(this.cookie.get("currentCity"));
		this.getArea(this.currentCity.code);
	}

	getArea(cityCode = 4401) {
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
	}

}
