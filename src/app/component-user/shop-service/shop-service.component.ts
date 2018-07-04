import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { TipPopService} from '../../service/tipPop.service';

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
	positionDesc;
	nearStreet;
	notNearStreet;
	keyword;
	mobile;

	constructor(private http: HttpService, private tip: TipPopService) { }

	ngOnInit() {

	}

	//获取列表
	getList(invalid){
		//表单验证
		let industryInValid = (this.industryIds && this.industryIds.length && !this.currentI && !this.suitI && !this.recommendI) || ((!this.industryIds || !this.industryIds.length) && (this.currentI || this.suitI || this.recommendI));
		let areaInvalid = this.minArea > this.maxArea;
		let doorWidthInvalid = this.minDoorWide > this.maxDoorWide;
		if(invalid || industryInValid || areaInvalid || doorWidthInvalid){
			this.tip.setValue('请按提示输入正确的查询数据！', false);
			return;
		}

		//数据处理
		let params:any = {
			page: 1, 
			pageSize: 30
		};
		this.minArea ? params.minArea = this.minArea : false;
		this.maxArea ? params.maxArea = this.maxArea : false;
		this.minDoorWide ? params.minDoorWide = this.minDoorWide : false;
		this.maxDoorWide ? params.maxDoorWide = this.maxDoorWide : false;
		this.districtId ? params.districtId = this.districtId : false;
		this.positionDesc ? params.positionDesc = this.positionDesc : false;
		this.keyword ? params.keyword = this.keyword : false;
		this.mobile ? params.mobile = this.mobile : false;
		if(this.nearStreet && !this.notNearStreet){
			params.nearSheet = 1;
		}else if(!this.nearStreet && this.notNearStreet){
			params.nearSheet = 2;
		}
		//发送请求
		this.http.get('shops', params, (data) => {
			console.log(data);
		})
	}
}
