import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { TipPopService } from '../../service/tipPop.service';
import { CommonService } from '../../service/common.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	//是否登录
	login: boolean = false;
	//当前用户详情
	userDetail = {};
	//当前城市
	currentCity;
	//当前用户服务区域
	districts = [];
	//是否可以跳转到管理平台
	toAdmin = false;
	//权限
	permission:any = {};
	//用户头像
	personUrl;

	constructor(private cookie: CookieService, private http: HttpService, private router:Router, private tip:TipPopService, private common: CommonService) { }

	ngOnInit() {
		this.login = this.cookie.get("Authorization") ? true : false;
		this.common.getUserPermission(data => {
	        this.permission = data;
	        for(let item in this.permission){
	        	if(item.slice(0, 2) === '00'){
	        		this.toAdmin = true;
	        	}
	        }
	    });
		this.common.getUserDetail(data => {
			this.userDetail = data;
      		this.personUrl = (data.photo && data.photo.url) ? data.photo.url : '';
			let citys = (data.districts && data.districts.length) ? data.districts : [{code: 4403, name: "深圳", hot: 0, status: 1, alphabet: "S"}];
			this.districts = this.handle(citys);
		})
		this.common.getCurrentCity(data => {
			this.currentCity = data;
		})
	}

	//退出登录
	logout() {
    	this.http.post('user/logout', '', data => {
        this.tip.setValue('退出登录成功！');
        this.router.navigate(['/user']);
        this.cookie.deleteAll();
        window.location.reload();
		})
	}

	//处理数据
	handle(arr){
		if(!arr){
			return [];
		}
		arr = arr.filter(v => v.code.toString().length == 4);
		let alphArr = [];
		arr.forEach(v => {
			if(alphArr.indexOf(v.alphabet) == -1) {
				alphArr.push(v.alphabet);
			}
		})
		let newArr = alphArr.map(v => {
			let a = arr.filter(w => {
				return w["alphabet"] == v;
			})
			return {"alpha": v, list: a};
		});
		return newArr;
	}

	//切换城市
	cityBox = false;
	chooseCity(item) {
		this.cookie.set('currentCity', JSON.stringify(item));
		this.cityBox = true;
		window.location.reload();
	}

}
