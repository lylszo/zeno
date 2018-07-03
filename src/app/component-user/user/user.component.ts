import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { TipPopService } from '../../service/tipPop.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	//是否登录
	login: boolean;
	//当前用户详情
	userDetail: any;
	//当前城市
	currentCity;

	constructor(private cookie: CookieService, private http: HttpService, private router:Router, private tip:TipPopService) { }

	ngOnInit() {
		this.login = this.cookie.get("Authorization") ? true : false;
		let detail = this.cookie.get("userDetail");
		this.userDetail = detail ? JSON.parse(detail) : {};
		let city = localStorage.getItem("currentCity");
		this.currentCity = city ? JSON.parse(city) : {code: 4403, name: '深圳'};
	}

	//退出登录
	logout() {
    	this.http.post('user/logout', '', data => {
			this.cookie.deleteAll();
      		localStorage.removeItem('currentCity');
	    	this.tip.setValue('退出登录成功！', true);
	    	window.location.reload();
      		this.router.navigateByUrl('/user');
		})
	}

}
