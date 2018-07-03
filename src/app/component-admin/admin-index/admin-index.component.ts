import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {
	//是否登录
	login: boolean;
	//用户详情
	userDetail: any;

	constructor(private cookie: CookieService) { }

	ngOnInit() {
		this.login = this.cookie.get("Authorization") ? true : false;
		this.userDetail = JSON.parse(this.cookie.get("userDetail"));
	}

}
