import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { TipPopService} from '../../service/tipPop.service';
import { Page } from "../../component-common/pagination/page.model";
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../../service/common.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-shop-service',
  templateUrl: './shop-service.component.html',
  styleUrls: ['./shop-service.component.scss']
})
export class ShopServiceComponent implements OnInit, AfterViewInit {
	//是否已登录
	login = this.cookie.get("Authorization") ? true : false;

	descriptions = [
		{code: 0, name: '全部'},
		{code: 1, name: '街道转角'},
		{code: 2, name: '街道路口'},
		{code: 3, name: '街道中心'},
		{code: 4, name: '交叉路口'},
		{code: 5, name: '社区内'},
		{code: 6, name: '小区底商'},
		{code: 7, name: '商场楼层'}
	];

	//查询参数
	industryIds;
	currentI;
	suitI;
	recommendI;
	minArea;
	maxArea;
	minDoorWide;
	maxDoorWide;
	districtId;
	positionDesc = 0;
	nearStreet;
	notNearStreet;
	keyword;
	mobile;

	//权限
	permission:any = {};

	constructor(private datePipe: DatePipe, private http: HttpService, private tip: TipPopService, private cookie: CookieService, private common: CommonService) { }

	ngOnInit() {
		//获取权限
	    this.common.getUserPermission(data => {
	        this.permission = data || {};
	    });
	}

	ngAfterViewInit() {
		this.getList();
	}

	//计算列表中的租金剩余时间
	// getRemainMonth(total:any, begin:any){
	// 	let now = new Date().getTime();
	// 	let num = parseInt((now - begin)/(86400000 * 30) + '') + 1;
	// 	if(total - num > 0) {
	// 		return (total - num);
	// 	}else {
	// 		return 0;
	// 	}
	// }

	//获取列表
	shopList = [];
	isQuery = false;
    pageConf: Page = {
		currentPage: 1,
		itemsPerPage: 30,
		maxSize: 5,
		numPages: 0
    };
	getList(invalid?){
		//表单验证
		let industryInValid = (this.industryIds && this.industryIds.length && !this.currentI && !this.suitI && !this.recommendI) || ((!this.industryIds || !this.industryIds.length) && (this.currentI || this.suitI || this.recommendI));
		let areaInvalid = this.minArea && this.maxArea && this.minArea > this.maxArea;
		let doorWidthInvalid = this.minDoorWide > this.maxDoorWide;
		if(invalid || industryInValid || areaInvalid || doorWidthInvalid){
			this.tip.setValue('请按提示输入正确的查询数据！', true);
			return;
		}

		//数据处理
		let params:any = {
			page: this.pageConf.currentPage, 
			pageSize: this.pageConf.itemsPerPage
		};
		this.minArea ? params.minArea = this.minArea : false;
		this.maxArea ? params.maxArea = this.maxArea : false;
		this.minDoorWide ? params.minDoorWide = this.minDoorWide : false;
		this.maxDoorWide ? params.maxDoorWide = this.maxDoorWide : false;
		this.districtId ? params.districtId = this.districtId : false;
		+this.positionDesc ? params.positionDesc = this.positionDesc : false;
		this.keyword ? params.keyword = this.keyword : false;
		this.mobile ? params.mobile = this.mobile : false;
		if(this.nearStreet && !this.notNearStreet){
			params.nearStreet = 2
		}else if(!this.nearStreet && this.notNearStreet){
			params.nearStreet = 3;
		}
		if(this.industryIds && this.industryIds.length) {
			let ids = this.industryIds.map(v => v.code);
			if(this.currentI){
				params.industryIds = ids;
			}
			if(this.suitI){
				params.suitIndustry = ids;
			}
			if(this.recommendI){
				params.recommendarIndustry = ids;
			}
		}
		//发送请求
		this.isQuery = true;
		let method = this.login ? 'get' : '_get'; 
		this.http[method]('shops', params, (data) => {
			this.isQuery = false;
			this.shopList = data.items;
			this.pageConf.totalItems = data.meta.total;
			this.pageConf.currentPage = data.meta.current_page;
			this.pageConf.numPages = data.meta.total_pages;
		}, (error) => {
			this.isQuery = false;
			this.shopList = [];
		})
	}

	//转化更新时间
	transferTime(time){
		if(!time){
			return '';
		}
		let now = new Date().getTime();
		let val = now - time;
		let minute = 60*1000;
		let hour = 60*minute;
		let today = this.datePipe.transform(now, "yyyy-MM-dd");
		let todayBegin = new Date(today + ' 00:00:00').getTime();
		let yesterdayBegin = todayBegin - 24*60*60*1000;
		let year = new Date().getFullYear();
		let yearBegin = new Date(year + '-01-01').getTime();
		if(val <= minute){
			return '刚刚';
		}else if(val <= hour){
			let minutes = parseInt(val/60000 + '');
			return `${minutes}分钟前`;
		}else if(time > todayBegin){
			return this.datePipe.transform(time, "yyyy-MM-dd HH:mm:ss").slice(11, 16);
		}else if(time > yesterdayBegin){
			return '昨天';
		}else if(time > yearBegin){
			return this.datePipe.transform(time, "yyyy-MM-dd").slice(5);
		}else{
			return this.datePipe.transform(time, "yyyy-MM-dd");
		}
	}
}
