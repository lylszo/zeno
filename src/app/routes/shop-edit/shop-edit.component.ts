import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { TipPopService} from '../../service/tipPop.service';
import { HttpService } from "../../service/http.service";
import { DatePipe } from "@angular/common";
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {
	//是否登录
	login: boolean;

	constructor(private datePipe: DatePipe, private router: Router, private tip: TipPopService, private http: HttpService, private route: ActivatedRoute, private cookie: CookieService, private common: CommonService) { }

	ngOnInit() {
		this.common.getUserPermission(data => {
	        if(data && data['10000102']){
				this.login = this.cookie.get("Authorization") ? true : false;
				this.initTime();
				this.onScroll();
				this.getDetail();
				this.getBoss();
				this.getCertificate();
				this.getEmployee();	        	
	        }else{
	        	this.router.navigate(['/user']);
	        }
	    });
	}

	suitIndustryDefault = [];
	unsuitIndustryDefault = [];
	recommendarIndustryDefault = [];
	industryDefault = [];
	defaultDistrictId;
	//获取店铺详情
	shopInfo:any = {};
  	getDetail() {
	    let id = +this.route.snapshot.params.id;
	    let method = this.login ? 'get' : '_get';
	    this.http[method](`shop/${id}`, '', data => {
	    	this.shopInfo = data;
	      	this.defaultDistrictId = data.buildVo.district;
	      	if(data.buildVo.address){
	      		this.intact.detailAddress = data.buildVo.address;
	      	}
	      	if(data.buildVo.latitude && data.buildVo.longitude){
	      		this.intact.point = {
	      			lng: data.buildVo.longitude,
	      			lat: data.buildVo.latitude
	      		}
	      	}
	      	this.intact.positionDesc = data.buildVo.positionDesc || 0;
	      	this.intact.nearStreet = data.buildVo.nearStreet || 1;
	      	if(data.buildVo.area){
	      		this.intact.buildingArea = data.buildVo.area;
	      	}
	      	if(data.buildVo.useArea){
	      		this.intact.useArea = data.buildVo.useArea;
	      	}
	      	if(data.buildVo.width){
	      		this.intact.width = data.buildVo.width;
	      	}
	      	if(data.buildVo.deep){
	      		this.intact.deep = data.buildVo.deep;
	      	}
	      	if(data.buildVo.doorWidth){
	      		this.intact.doorWidth = data.buildVo.doorWidth;
	      	}
	      	if(data.buildVo.height){
	      		this.intact.height = data.buildVo.height;
	      	}
	      	if(data.buildVo.floor){
	      		this.intact.floor = data.buildVo.floor;
	      	}
	      	if(data.buildVo.floorNum){
	      		this.intact.floorNum = data.buildVo.floorNum;
	      	}
	      	if(data.buildVo.suitIndustry) {
	      		this.suitIndustryDefault = data.buildVo.suitIndustry.split(',');
	      	}
	      	if(data.buildVo.unsuitIndustry) {
	      		this.unsuitIndustryDefault = data.buildVo.unsuitIndustry.split(',');
	      	}
	      	if(data.buildVo.recommendarIndustry) {
	      		this.recommendarIndustryDefault = data.buildVo.recommendarIndustry.split(',');
	      	}
	      	this.intact.parentProperty = data.buildVo.parentProperty || 0;
	      	this.intact.parentPropertyName = data.buildVo.parentPropertyName || '';
	      	if(data.buildVo.propertyMatch){
	      		let propertyMatchArr = data.buildVo.propertyMatch.split(',');
	      		if(propertyMatchArr.length){
		      		this.properties.forEach(v => {
		      			let has = false;
		      			propertyMatchArr.forEach(w => {
		      				if(w == v.code) {
		      					has = true;
		      				}
		      			})
		      			v.value = has;
		      		})	      			
	      		}
	      	}
	      	if(data.buildVo.waterFee){
	      		this.intact.waterFee = data.buildVo.waterFee/100;
	      	}
	      	if(data.buildVo.electricityFee){
	      		this.intact.electricityFee = data.buildVo.electricityFee/100;
	      	}
	      	if(data.buildVo.propertyFee){
	      		this.intact.propertyFee = data.buildVo.propertyFee/100;
	      	}
	      	if(data.buildVo.rent){
	      		this.intact.rentFee = data.buildVo.rent/100;
	      	}
	      	if(data.buildVo.gasFee){
	      		this.intact.gasFee = data.buildVo.gasFee/100;
	      	}
	      	if(data.buildVo.warmAirFee){
	      		this.intact.warmAirFee = data.buildVo.warmAirFee/100;
	      	}
	      	this.intact.buildingShape = data.buildVo.shape || 0;
	      	this.intact.propertyRight = data.buildVo.propertyRight || 0;
	      	if(data.buildVo.risk){
	      		this.intact.removeRisk = data.buildVo.risk;
	      	}
	      	this.intact.riskDescription = data.buildVo.riskDescription;
	      	if(data.buildVo.ownerNickname && data.buildVo.ownerMobile){
	      		let obj:any = {};
	      		obj.nickname = data.buildVo.ownerNickname;
	      		let mobiles = data.buildVo.ownerMobile.split(',');
	      		if(mobiles.length == 1){
	      			obj.phone = data.buildVo.ownerMobile;
	      		}else{
	      			obj.phone = mobiles[0];
	      			mobiles.shift();
	      			obj.phoneList = mobiles;
	      		}
	      		obj.name = data.buildVo.ownerName;
	      		if(data.buildVo.ownerBirthday){
	      			obj.birthday = this.datePipe.transform(data.buildVo.ownerBirthday, "yyyy-MM-dd");
	      		}
	      		obj.email = data.buildVo.ownerEmail;
	      		obj.address = data.buildVo.ownerAddress;
	      		obj.qq = data.buildVo.ownerQq;
	      		obj.wechart = data.buildVo.ownerWechat;
	      		obj.gender = data.buildVo.ownerSex;
	      		obj.description = data.buildVo.ownerDescription;
	      		if(obj.nickname && obj.phone){
		      		this.landlord = obj;
		      		this.landlordList.push(obj);	      			
	      		}
	      	}
	      	this.intact.shopName = data.name;
	      	this.intact.isBrand = data.checkBrand ? true : false;
	      	this.intact.brandName = data.brandName;
	      	this.intact.branchName = data.branchShop;
	      	this.intact.operationType = data.operateMode;
	      	if(data.industryId) {
	      		this.industryDefault = [data.industryId];
	      	}
	      	if(data.openDate){
	      		this.openDate = this.datePipe.transform(data.openDate, "yyyy-MM-dd");
	      	}
	      	this.intact.operateStatus = data.operateStatus;
	      	this.intact.contactName = data.contact;
	      	this.intact.contactMobile = data.mobile;
	      	this.intact.outSaleMobile = data.outSaleMobile;
	      	if(data.operateTimeBegin && data.operateTimeEnd){
	      		let start = this.datePipe.transform(data.operateTimeBegin, "yyyy-MM-dd HH:mm:ss").slice(11, 16);
	      		let end = this.datePipe.transform(data.operateTimeEnd, "yyyy-MM-dd HH:mm:ss").slice(11, 16);
	      		if(start == '00:00' && end == '00:00'){
	      			this.wholeDay = true;
	      		}else{
	      			this.bStartTime = start;
	      			this.bEndTime = end;
	      		}
	      	}else{
		      	if(data.operateTimeBegin){
		      		this.bStartTime = this.datePipe.transform(data.operateTimeBegin, "yyyy-MM-dd HH:mm:ss").slice(11, 16);
		      	}
		      	if(data.operateTimeEnd){
		      		this.bEndTime = this.datePipe.transform(data.operateTimeEnd, "yyyy-MM-dd HH:mm:ss").slice(11, 16);
		      	}	      		
	      	}
	      	if(data.operateWeek){
	      		let strArr = data.operateWeek.toString().split('').reverse();
	      		let num = 0;
	      		this.weekItems.forEach((v, i) => {
	      			if(strArr[i] == '1'){
	      				v.value = true;
	      				num++;
	      			}
	      		})
	      		if(num == 7){
	      			this.wholeWeek = true;
	      		}
	      	}
	      	this.intact.decorateGrade = data.decorateGrade;
			if(data.provideService){
	      		let serviceArr = data.provideService.split(',');
	      		if(serviceArr.length){
		      		this.serviceItems.forEach(v => {
		      			let has = false;
		      			serviceArr.forEach(w => {
		      				if(w == v.code) {
		      					has = true;
		      				}
		      			})
		      			v.value = has;
		      		})	      			
	      		}
	      	}
	      	if(data.rent){
	      		this.intact.shopRentFee = data.rent/100;
	      	}
	      	this.intact.rentUnit = data.rentUnit;
	      	if(data.rentPayMode){
	      		let hasIt = false;
	      		this.rentPayModeSelect.forEach(v => {
	      			if(v.name == data.rentPayMode){
	      				hasIt = true;
	      			}
		      	})
		      	if(hasIt){
		      		this.intact.rentPayMode = data.rentPayMode;
		      	}else{
		      		this.intact.rentPayMode = '自定义';
		      		this.myRentPayMode = data.rentPayMode;
		      	}
	      	}
	      	if(data.rentDepositMode){
	      		let hasIt = false;
	      		this.rentDepositModeSelect.forEach(v => {
	      			if(v.name == data.rentDepositMode){
	      				hasIt = true;
	      			}
		      	})
		      	if(hasIt){
		      		this.intact.rentDepositMode = data.rentDepositMode;
		      	}else{
		      		this.intact.rentDepositMode = '自定义';
		      		this.myRentDepositMode = data.rentDepositMode;
		      	}
	      	}
	      	this.intact.increase = data.rentIsIncrease;
	      	this.intact.increaseNum = data.rentIncreaseNum;
	      	if(data.rentContractBeginDate){
	      		this.leaseDate = this.datePipe.transform(data.rentContractBeginDate, "yyyy-MM-dd");
	      	}
	      	if(data.rentContractMonths){
	      		this.intact.rentMonths = data.rentContractMonths;
	      	}
	      	if(data.rentContractRemainMonths){
	      		this.intact.remainMonths = data.rentContractRemainMonths;
	      	}
	      	if(data.operatePrice){
	      		this.intact.operatePrice = data.operatePrice/100;
	      	}
	      	if(data.operateDayVolume){
	      		this.intact.operateDayVolume = data.operateDayVolume/100;
	      	}
	      	if(data.operateConsumer){
	      		this.intact.operateConsumer = data.operateConsumer;
	      	}
	      	if(data.operateBestTimes){
	      		let bestArr = data.operateBestTimes.split(',');
	      		this.bestTimes.forEach(v => {
	      			bestArr.forEach(w => {
	      				if(w == v.code){
	      					v.value = true;
	      				}
	      			})
	      		})
	      	}
	      	if(data.operateNumInRoom){
	      		this.intact.operateNumInRoom = data.operateNumInRoom;
	      	}
	      	if(data.operateOutSaleNum){
	      		this.intact.operateOutSaleNum = data.operateOutSaleNum;
	      	}
	      	if(data.operateVipNum){
	      		this.intact.operateVipNum = data.operateVipNum;
	      	}
	      	if(data.operateVipMode){
	      		this.intact.operateVipMode = data.operateVipMode;
	      	}
	      	this.intact.description = data.description;
	      	if(data.photoList && data.photoList.length) {
	      		let doorList = data.photoList.filter(v => v.resourceType == 1);
	      		this.doorPhotoList = doorList.map(v => {
	      			return {
	      				id: v.resourceId,
	      				url: v.url
	      			}
	      		})
	      		let envirList = data.photoList.filter(v => v.resourceType == 2);
	      		this.environmentPhotoList = envirList.map(v => {
	      			return {
	      				id: v.resourceId,
	      				url: v.url
	      			}
	      		})
	      	}
	      	this.intact.transferStatus = data.transferStatus;
	      	if(data.transferFee){
	      		this.intact.transferFee = data.transferFee/1000000;
	      	}
	      	this.intact.negotiable = data.transferCanFace;
	      	this.intact.freeTransfer = data.transferCanEmpty;
	      	if(data.transferFaceFee){
	      		this.intact.freeTransferFee = data.transferFaceFee/1000000;
	      	}
	      	this.intact.transferContent = data.transferContent;
	      	this.intact.transferReason = data.transferReason;
	    });
    }

    //获取老板信息
    bossDefaultDistrictId;
    getBoss() {
    	let id = +this.route.snapshot.params.id;
    	let params = {
    		shopId: id,
    		page: 1,
    		pageSize: 100
    	};
	    let method = this.login ? 'get' : '_get';
	    this.http[method]('shopBosses', params, data => {
	    	this.boss
	    	let list = data.items.concat();
    		let newList:any = [];
    		if(list.length) {
    			list.forEach(v => {
    				let obj:any = {};
    				obj.type = v.type;
    				obj.nickname = v.practitionersVo.nickname;
    				if(v.practitionersVo.gender){
    					obj.gender = v.practitionersVo.gender + '';
    				}
    				obj.phoneList = [];
    				if(v.practitionersVo.mobile) {
    					let mobiles = v.practitionersVo.mobile.split(',');
    					if(mobiles.length == 1){
    						obj.mobile = mobiles[0];
    					}else {
    						obj.mobile = mobiles[0];
    						mobiles.shift();
    						obj.phoneList = mobiles;
    					}
    				}
    				if(v.practitionersVo.districtId){
    					this.bossDefaultDistrictId = v.practitionersVo.districtId;
    					obj.districtId = v.practitionersVo.districtId;
    				}
    				obj.stock = v.stock*100;
    				obj.realName = v.practitionersVo.realName;
    				if(v.practitionersVo.birthday){
    					obj.birthday = this.datePipe.transform(v.practitionersVo.birthday, "yyyy-MM-dd");
    				}
    				obj.email = v.practitionersVo.email;
    				obj.otherAccountQq = v.practitionersVo.otherAccountQq;
    				obj.otherAccountWx = v.practitionersVo.otherAccountWx;
    				obj.otherDescription = v.practitionersVo.otherDescription;
    				obj.id = v.id;
    				newList.push(obj);
    			})
    			this.bossList = newList.concat();
    		}
	    })
    }

    //获取员工信息
    getEmployee() {
    	let id = +this.route.snapshot.params.id;
    	let params = {
    		shopId: id,
    		page: 1,
    		pageSize: 100
    	};
	    let method = this.login ? 'get' : '_get';
    	this.http[method]('shopEmployees', params, data => {
    		let list = data.items.concat();
    		let newList:any = [];
    		if(list.length) {
    			list.forEach(v => {
    				let obj:any  = {};
    				obj.nickname = v.practitionersVo.nickname;
    				if(v.practitionersVo.gender){
    					obj.gender = v.practitionersVo.gender + '';
    				}
    				obj.phoneList = [];
    				if(v.practitionersVo.mobile) {
    					let mobiles = v.practitionersVo.mobile.split(',');
    					if(mobiles.length == 1){
    						obj.mobile = mobiles[0];
    					}else {
    						obj.mobile = mobiles[0];
    						mobiles.shift();
    						obj.phoneList = mobiles;
    					}
    				}
    				obj.realName = v.practitionersVo.realName;
    				if(v.enterDate){
    					obj.enterDate = this.datePipe.transform(v.enterDate, "yyyy-MM-dd");
    				}
    				if(v.isQuit == 2){
    					obj.isQuit = true;
    				}
    				if(v.quitDate){
    					obj.quitDate = this.datePipe.transform(v.quitDate, "yyyy-MM-dd");
    				}
    				obj.jobDescription = v.jobDescription;
    				obj.id = v.id;
    				newList.push(obj);
    			})
    			this.employeeList = newList.concat();
    		}
    	})
    }

    //获取证件信息
    getCertificate() {
    	let id = +this.route.snapshot.params.id;
    	let params = {
    		shopId: id,
    		page: 1,
    		pageSize: 100
    	};
	    let method = this.login ? 'get' : '_get';
    	this.http[method]('shopCertificates', params, data => {
    		let list:any = (data && data.items) ? data.items.concat() : [];
    		if(list.length) {
    			this.certificateList = list;
    		}
    	})
    }

	//表单数据初始化
	intact:any = {
		positionDesc: 0,
		rentUnit: 1,
		operationType: 0,
		nearStreet: 1,
		negotiable: 0,
		freeTransfer: 0,
		transferStatus: 1,
		parentProperty: 0,
		decorateGrade: 0,
		propertyRight: 0,
		removeRisk: 0,
		operateStatus: 0,
		buildingShape: 0,
		operateVipMode: 0,
		increase: -1,
		rentPayMode: '---请选择---',
		rentDepositMode: '---请选择---'
	};
	//是否提交过表单
	intactSubmitted = false;

	//租金单位
	rentUnit = [
		{code: 1, name: '元/月'},
		{code: 2, name: '元/天'},
		{code: 3, name: '万元/年'},
		{code: 4, name: '元/平米*月'},
		{code: 5, name: '元/平米*天'}
	];

	//支付方式
	myRentPayMode;
	rentPayModeSelect = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '一月一付'},
		{code: 2, name: '二月一付'},
		{code: 3, name: '三月一付'},
		{code: 4, name: '半年一付'},
		{code: 5, name: '一年一付'},
		{code: 6, name: '自定义'}
	];

	//支付押金
	myRentDepositMode;
	rentDepositModeSelect = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '1月租金'},
		{code: 2, name: '2月租金'},
		{code: 3, name: '3月租金'},
		{code: 4, name: '自定义'}
	];

	//方位描述
	descriptions = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '街道转角'},
		{code: 2, name: '街道路口'},
		{code: 3, name: '街道中心'},
		{code: 4, name: '交叉路口'},
		{code: 5, name: '社区内'},
		{code: 6, name: '小区底商'},
		{code: 7, name: '商场楼层'}
	];

	//最旺时段
	bestTimes = [
		{code: 1, name: '早晨', value: false},
		{code: 2, name: '上午', value: false},
		{code: 3, name: '中午', value: false},
		{code: 4, name: '下午', value: false},
		{code: 5, name: '傍晚', value: false},
		{code: 6, name: '晚上', value: false},
		{code: 7, name: '凌晨', value: false}
	];

	//转让状态
	transferStatusItems = [
		{code: 1, name: '不转让', value: true},
  		{code: 2, name: '转让中', value: false},
  		{code: 3, name: '转让成功', value: false},
  		{code: 4, name: '租约到期', value: false}
	];

	//是否递增
	increaseSelect = [
		{code: -1, name: '---请选择---'},
		{code: 0, name: '不递增'},
		{code: 1, name: '递增'}
	];

	//是否临街
	nearStreetSelect = [
		{code: 1, name: '全部'},
		{code: 2, name: '临街'},
		{code: 3, name: '不临街'}
	];

	//可否面议
	negotiableSelect = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '不可面议'},
		{code: 2, name: '可面议'}
	];

	//可否空转
	freeTransferSelect = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '不可空转'},
		{code: 2, name: '可空转'}
	];

	//产权类型
	propertyRight = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '大产权'},
		{code: 2, name: '小产权'}
	];

	//拆迁风险
	removeRiskSelect = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '无'},
		{code: 2, name: '有'}
	];

	//建筑形状
	buildingShape = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '正方形'},
  		{code: 2, name: '长方形'},
  		{code: 3, name: '不规则形'},
  		{code: 4, name: '厂棚'}
	];

	//装修档次
	decorateGrade = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '毛坯'},
  		{code: 2, name: '简装'},
  		{code: 3, name: '精装'},
  		{code: 4, name: '豪华'}
	];

	//品牌运营模式
	brandOperationType = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '连锁'},
		{code: 2, name: '直营'},
		{code: 3, name: '代理'},
		{code: 4, name: '经销'},
		{code: 5, name: '特许'},
		{code: 6, name: '其他'}
	];

	//证件类型
	certificateTypeSelect = [
		{code: -1, name: '---请选择---'},
		{code: 1, name: '营业执照'},
		{code: 2, name: '税务登记证'},
		{code: 3, name: '组织机构代码证'},
		{code: 4, name: '卫生许可证'},
		{code: 5, name: '公共场所安全许可证'},
		{code: 6, name: '餐饮服务许可证'},
		{code: 7, name: '食品流通许可证'},
		{code: 8, name: '酒类批发许可证 '},
		{code: 0, name: '其他'}
	];

	//会员形式
	operateVipModeSelect = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '会员卡'},
		{code: 2, name: '注册会员'},
		{code: 3, name: '储值卡'}
	];

	//物业配套
	properties = [
		{code: 1, name: '可明火', value: false},
		{code: 2, name: '380v电压', value: false},
		{code: 3, name: '电梯', value: false},
		{code: 4, name: '暖气', value: false},
		{code: 5, name: '停车位', value: false},
		{code: 6, name: '上水', value: false},
		{code: 7, name: '排烟', value: false},
		{code: 8, name: '中央空调', value: false},
		{code: 9, name: '网络', value: false},
		{code: 10, name: '天然气', value: false},
		{code: 11, name: '外摆区', value: false},
		{code: 12, name: '排污', value: false},
	];

	//上级物业
	parentPropertys = [
  		{code: 0, name: '---请选择---'},
  		{code: 1, name: '商铺'},
		{code: 2, name: '社区'},
		{code: 3, name: '商场'},
		{code: 4, name: '写字楼'},
		{code: 5, name: '医院'},
		{code: 6, name: '景区'},
		{code: 7, name: '游乐园'},
		{code: 8, name: '公园'},
		{code: 9, name: '学校'},
		{code: 10, name: '美食城'},
		{code: 11, name: '汽车站'},
		{code: 12, name: '火车站'}
  	];

	//提供服务
	serviceItems = [
		{code: 1, name: '可刷卡', value: false},
		{code: 2, name: '包间', value: false},
		{code: 3, name: '外卖', value: false},
		{code: 4, name: '支付宝支付', value: false},
		{code: 5, name: '微信支付', value: false},
		{code: 6, name: 'WIFI', value: false},
		{code: 7, name: '可订座', value: false},
		{code: 8, name: '机打发票', value: false},
		{code: 9, name: '手撕发票', value: false}
	];

	//经营状态
	operateStatus = [
		{code: 0, name: '---请选择---'},
		{code: 1, name: '经营中'},
		{code: 2, name: '停业'},
		{code: 3, name: '装修'}
	];

	//房东手机数
	landlordPhoneNum = 1;

	//老板身份
	bossIdentities = [
		{code: 0, name: '老板'},
		{code: 1, name: '合伙人'},
	];
	//营业时段
	bStartTime: any;
	bEndTime: any;
	wholeWeek: boolean = false;// 是否整周
	wholeDay: boolean = false;//是否24小时
	bTime: boolean = false;
	//营业时间（周一到周日）
	weekItems = [
		{code: 1, name: '周一', value: false},
		{code: 2, name: '周二', value: false},
		{code: 3, name: '周三', value: false},
		{code: 4, name: '周四', value: false},
		{code: 5, name: '周五', value: false},
		{code: 6, name: '周六', value: false},
		{code: 7, name: '周日', value: false},
	];
	chooseWholeWeek(thisValue){
		this.weekItems.forEach(function(v){
			v.value = !thisValue;
		})
	}
	chooseWeekItem(thisValue) {
		let checkedArr = this.weekItems.filter(function(v){
			return v.value;
		})
		this.wholeWeek = false;
		if(checkedArr.length == 6 && !thisValue) {
			this.wholeWeek = true;
		}
	}
	chooseWholeDay(thisValue){
		if(!thisValue){
			this.bStartTime = '';
			this.bEndTime = '';
		}
	}

	//上传图片
	doorPhotoList = [];
	environmentPhotoList = [];

	//初始化日期类数据
	openDate: any;//开业日期
	leaseDate: any;//租约日期
	joinDate: any;//入职日期
	dimissionDate: any;//入职日期
	bossBirthday: any;//老板出生年月
	landlordBirthday: any;//房东出生年月
	initTime() {
		//开业日期
		laydate.render({
			elem: '#openDate',
			done: (value) => {
				this.openDate = value;
			}
	    });
		//租约日期
		laydate.render({
			elem: '#leaseDate',
			done: (value) => {
				this.leaseDate = value;
			}
	    });
		//营业时段
		laydate.render({
			elem: '#bStartTime',
			format: 'HH:mm',
			type: 'time',
			done: (value) => {
				if(value) {
					this.bStartTime = value;
					this.wholeDay = false;
				}
			}
	    });
		laydate.render({
			elem: '#bEndTime',
			format: 'HH:mm',
			type: 'time',
			done: (value) => {
				if(value) {
					this.bEndTime = value;
					this.wholeDay = false;
				}
			}
	    });
		//房东出生年月
		laydate.render({
			elem: '#landlordBirthday',
			max: new Date().getTime(),
			done: (value) => {
				if(value) {
					this.landlord.birthday = value;
				}
			}
	    });
		//老板出生年月
		laydate.render({
			elem: '#bossBirthday',
			max: new Date().getTime(),
			done: (value) => {
				if(value) {
					this.boss.birthday = value;
				}
			}
	    });
		//员工入职日期
		laydate.render({
			elem: '#joinDate',
			done: (value) => {
				if(value) {
					this.employee.enterDate = value;
				}
			}
	    });
		//员工离职日期
		laydate.render({
			elem: '#dimissionDate',
			done: (value) => {
				if(value) {
					this.employee.quitDate = value;
				}
			}
	    });
	}

	//弹框
	@ViewChild('landlordModal') landlordModal: ModalDirective;
	@ViewChild('landlordDelModal') landlordDelModal: ModalDirective;
	@ViewChild('bossModal') bossModal: ModalDirective;
	@ViewChild('bossDelModal') bossDelModal: ModalDirective;
	@ViewChild('employeeModal') employeeModal: ModalDirective;
	@ViewChild('employeeDelModal') employeeDelModal: ModalDirective;
	@ViewChild('certificateModal') certificateModal: ModalDirective;
	@ViewChild('certificateDelModal') certificateDelModal: ModalDirective;
	//电话数
	phoneNum = 0;
	modalTitle: string = '添加';//是编辑还是添加
	// 房东信息列表
	landlord:any = {
		phoneList: []
	};
	landlordList:any = [];
	landlordIndex:any;
	landlordPhoneAdd() {
		this.phoneNum++;
		if(!this.landlord.phoneList){
			this.landlord.phoneList = [];
		}
		this.landlord.phoneList.push({
			code: this.phoneNum
		});
	}
	landlordPhoneDel(i) {
		this.landlord.phoneList.splice(i, 1);
	}
	//打开添加/编辑房东信息弹框
	openLandlord(item, idx) {
		this.landlordIndex = idx;
		this.modalTitle = item ? '编辑': '添加';
		if(item){
			this.landlord = JSON.parse(JSON.stringify(item));
		}else{
			this.landlord = {
				phoneList: []
			}
		}
		this.landlordModal.show();
	}
	//确定添加/编辑房东信息
	submitLandlord(form) {
		if(form.invalid){
			this.tip.setValue('请按提示输入正确的数据！', true);
			return;
		}
		if(this.modalTitle == '添加'){
			this.landlordList.push(this.landlord);
		}else{
			this.landlordList[this.landlordIndex] = this.landlord;
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.landlordModal.hide();
	}
	//打开删除房东信息
	openLandlordDel(idx){
		this.landlordDelModal.show();
		this.landlordIndex = idx;
	}
	//确定删除房东信息
	delLandlord() {
		this.landlordList.splice(this.landlordIndex, 1);
		this.landlordDelModal.hide();
	}

	//老板信息列表
	boss:any = {
		phoneList: []
	};
	bossList:any = [];
	bossIndex:any;
	bossItem:any;
	bossListDel:any = [];
	bossPhoneAdd() {
		this.phoneNum++;
		this.boss.phoneList.push({
			code: this.phoneNum
		});
	}
	bossPhoneDel(i) {
		this.boss.phoneList.splice(i, 1);
	}

	//打开添加/编辑老板信息弹框
	openBoss(item, idx) {
		this.bossIndex = idx;
		this.modalTitle = item ? '编辑': '添加';
		//是否已选老板身份
		let chooseBossIdentity = false;
		this.bossList.forEach(v => {
			if(v.type === 0 || v.type === '0') {
				chooseBossIdentity = true;
			}
		})
		let defaultItem = {
			type: 0,
			phoneList: []
		}
		if(item && item.type == '0'){
			this.bossIdentities = [
				{code: 0, name: '老板'},
			];
		}else if(chooseBossIdentity) {
			this.bossIdentities = [
				{code: 1, name: '合伙人'},
			];
			defaultItem.type = 1;
		}else {
			this.bossIdentities = [
				{code: 0, name: '老板'},
				{code: 1, name: '合伙人'},
			];
			defaultItem.type = 0;
		}
		if(item){
			this.boss = JSON.parse(JSON.stringify(item));
		}else{
			this.boss = defaultItem;
		}
		this.bossModal.show();
	}

	//确定添加/编辑老板信息
	bossDistrictiIsDetail;
	submitBoss(form) {
		if(form.invalid || !this.bossDistrictiIsDetail){
			this.tip.setValue('请按提示输入正确的数据！', true);
			return;
		}
		if(this.modalTitle == '添加'){
			this.bossList.push(this.boss);
		}else{
			this.bossList[this.bossIndex] = this.boss;
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.bossModal.hide();
	}
	//打开删除老板信息
	openBossDel(item, idx){
		this.bossDelModal.show();
		this.bossItem = item;
		this.bossIndex = idx;
	}

	//确定删除老板信息
	delBoss() {
		if(this.bossItem.id) {
			this.bossItem.status = -1;
			this.bossListDel.push(this.bossItem);
		}
		this.bossList.splice(this.bossIndex, 1);
		this.bossDelModal.hide();
	}

	//员工信息列表
	employee:any = {
		phoneList: []
	};
	employeeList:any = [];
	employeeIndex:any;
	employeeItem:any;
	employeeListDel:any = [];
	employeePhoneAdd() {
		this.phoneNum++;
		this.employee.phoneList.push({
			code: this.phoneNum
		});
	}
	employeePhoneDel(i) {
		this.employee.phoneList.splice(i, 1);
	}

	//打开添加/编辑员工信息弹框
	openEmployee(item, idx) {
		this.employeeIndex = idx;
		this.modalTitle = item ? '编辑': '添加';
		if(item){
			this.employee = JSON.parse(JSON.stringify(item));
		}else{
			this.employee = {
				phoneList: []
			};
		}
		this.employeeModal.show();
	}

	//确定添加/编辑员工信息
	submitEmployee(form) {
		if(form.invalid){
			this.tip.setValue('请按提示输入正确的数据！', true);
			return;
		}
		if(this.modalTitle == '添加'){
			this.employeeList.push(this.employee);
		}else{
			this.employeeList[this.employeeIndex] = this.employee;
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.employeeModal.hide();
	}
	// 打开删除老板信息
	openEmployeeDel(item, idx){
		this.employeeDelModal.show();
		this.employeeItem = item;
		this.employeeIndex = idx;
	}

	//确定删除员工信息
	delEmployee() {
		if(this.employeeItem.id) {
			this.employeeItem.status = -1;
			this.employeeListDel.push(this.employeeItem);
		}
		this.employeeList.splice(this.employeeIndex, 1);
		this.employeeDelModal.hide();
	}
	//添加证件信息
	certificate:any = {
		type: -1
	};
	certificateList:any = [];
	clickCertificatePhoto;
	certificateIndex:any;
	certificateItem:any;
	certificateListDel:any = [];

	//打开添加或编辑证件弹框
	openCertificate(item, idx) {
		this.certificateIndex = idx;
		this.clickCertificatePhoto = false;
		this.modalTitle = item ? '编辑': '添加';
		if(item){
			this.certificate = JSON.parse(JSON.stringify(item));
		}else{
			this.certificate = {
				type: -1,
				photoList: []
			};
		}
		this.certificateModal.show();
	}

	//提交证件
	submitCertificate(form){
		if(form.invalid || this.certificate.type == -1 || !this.certificate.photoList || !this.certificate.photoList.length || (this.certificate.certificateType == '0' && !this.certificate.certificateName)){
			this.tip.setValue('请按提示输入正确的数据！', true);
			return;
		}
		if(this.modalTitle == '添加'){
			this.certificateList.push(this.certificate);
		}else{
			this.certificateList[this.certificateIndex] = this.certificate;
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.certificateModal.hide();
	}

	//打开删除证件弹框
	openCertificateDel(item, idx){
		this.certificateDelModal.show();
		this.certificateItem = item;
		this.certificateIndex = idx;
	}

	//删除证件
	delCertificate(){
		if(this.certificateItem.id) {
			this.certificateItem.status = -1;
			this.certificateListDel.push(this.certificateItem);
		}
		this.certificateList.splice(this.certificateIndex, 1);
		this.certificateDelModal.hide();
	}

	//回到顶部
	scrollTo(id) {
		if(id){
			$("html,body").finish().animate({"scrollTop":$('#'+id).offset().top - 84},  300);
		}else {
			$("html,body").finish().animate({"scrollTop":"0px"}, 400);
		}
	}
	//监听滚动事件
	scrollActive: string = 'wuyejianzhu';
	scrollArr = ['wuyejianzhu', 'weizhi', 'jianzhu', 'wuye', 'fangdong', 'dianpu', 'jiben', 'laoban', 'yuangong', 'tupian', 'zhengjian', 'zhuanrang'];
	onScroll() {
		window.onscroll = e => {
			if(this.scrollArr) {
				let top = $("html,body").scrollTop();
				this.scrollArr.forEach(v => {
					if($('#' + v).offset()){
						let thisTop = $('#' + v).offset().top - 84;
						if(top >= thisTop){
							this.scrollActive = v;
						}
					}
				})
			}
		}
	}


	customTrackBy(index: number, obj: any): any {
	    return index;
  	}


	//提交修改
	edit() {
		//点击了提交显示可能出现错误信息
		this.intactSubmitted = true;
		//检查错误
		setTimeout(() => {
			let errors: any = $('.intact').find('.error').find('span');

			if(errors.length) {
				$("html,body").finish().animate({"scrollTop":$(errors[0]).parent().parent().parent().offset().top - 84},  300);
				this.tip.setValue('请按提示输入正确的数据！', true);
				return;
			}
			let params:any = {
				buildInfo: {},
				shopInfo: {}
			};

			//建筑信息
			if(this.intact.distrcitId) {
				params.buildInfo.district = this.intact.distrcitId;
			}
			params.buildInfo.address = this.intact.detailAddress || '';
			params.buildInfo.latitude = this.intact.point ? this.intact.point.lat : null;
			params.buildInfo.longitude = this.intact.point ? this.intact.point.lng : null;
			if(this.intact.positionDesc) {
				params.buildInfo.positionDesc = +this.intact.positionDesc;
			}
			if(this.intact.nearStreet) {
				params.buildInfo.nearStreet = +this.intact.nearStreet;
			}
			params.buildInfo.area = +this.intact.buildingArea || 0;
			params.buildInfo.useArea = +this.intact.useArea || 0;
			params.buildInfo.width = +this.intact.width || 0;
			params.buildInfo.deep = +this.intact.deep || 0;
			params.buildInfo.doorWidth = +this.intact.doorWidth || 0;
			params.buildInfo.height = +this.intact.height || 0;
			params.buildInfo.floor = this.intact.floor || 0;
			if(this.intact.floorNum) {
				params.buildInfo.floorNum = +this.intact.floorNum;
			}
			if(this.intact.suitIndustry && this.intact.suitIndustry.length) {
				let suitList = this.intact.suitIndustry.map(v => v.code);
				params.buildInfo.suitIndustry = suitList.join();
			}else{
				params.buildInfo.suitIndustry = '';
			}
			if(this.intact.unsuitIndustry && this.intact.unsuitIndustry.length) {
				let suitList = this.intact.unsuitIndustry.map(v => v.code);
				params.buildInfo.unsuitIndustry = suitList.join();
			}else{
				params.buildInfo.unsuitIndustry = '';
			}
			if(this.intact.recommendIndustry && this.intact.recommendIndustry.length) {
				let suitList = this.intact.recommendIndustry.map(v => v.code);
				params.buildInfo.recommendarIndustry = suitList.join();
			}else{
				params.buildInfo.recommendarIndustry = '';
			}
			if(this.intact.parentProperty) {
				params.buildInfo.parentProperty = +this.intact.parentProperty;
			}
			params.buildInfo.parentPropertyName = this.intact.parentPropertyName || '';
			let propertySelectedArr = this.properties.filter(v => v.value);
			if(propertySelectedArr.length) {
				let propertyList = propertySelectedArr.map(v => v.code);
				params.buildInfo.propertyMatch = propertyList.join();
			}else{
				params.buildInfo.propertyMatch = '';
			}
			params.buildInfo.waterFee = this.intact.waterFee ? this.intact.waterFee*100 : 0;
			params.buildInfo.electricityFee = this.intact.electricityFee ? this.intact.electricityFee*100 : 0;
			params.buildInfo.propertyFee = this.intact.propertyFee ? this.intact.propertyFee*100 : 0;
			params.buildInfo.rent = this.intact.rentFee ? this.intact.rentFee*100 : 0;
			params.buildInfo.gasFee = this.intact.gasFee ? this.intact.gasFee*100 : 0;
			params.buildInfo.warmAirFee = this.intact.warmAirFee ? this.intact.warmAirFee*100 : 0;
			if(this.intact.buildingShape) {
				params.buildInfo.shape = +this.intact.buildingShape;
			}
			if(this.intact.propertyRight) {
				params.buildInfo.propertyRight = +this.intact.propertyRight;
			}
			if(this.intact.removeRisk) {
				params.buildInfo.risk = +this.intact.removeRisk;
			}
			if(this.intact.removeRisk == 2) {
				params.buildInfo.riskDescription = this.intact.riskDescription || '';
			}

			// 房东信息
			let landlordInfo = this.landlordList[0] || {};
			params.buildInfo.ownerNickname = landlordInfo.nickname || '';
			if(landlordInfo.phone){
				if(landlordInfo.phoneList && landlordInfo.phoneList.length){
					params.buildInfo.ownerMobile = landlordInfo.phone + ',' + landlordInfo.phoneList.join();
				}else{
					params.buildInfo.ownerMobile = landlordInfo.phone;
				}
			}else{
				params.buildInfo.ownerMobile = '';
			}
			params.buildInfo.ownerName = landlordInfo.name || '';
			if(landlordInfo.birthday){
				params.buildInfo.ownerBirthday = new Date(landlordInfo.birthday).getTime();
			}else{
				params.buildInfo.ownerBirthday = 0;
			}
			if(landlordInfo.email) {
				params.buildInfo.ownerEmail = landlordInfo.email;
			}
			params.buildInfo.ownerAddress = landlordInfo.address || '';
			params.buildInfo.ownerQq = landlordInfo.qq || '';
			params.buildInfo.ownerWechat = landlordInfo.wechart || '';
			params.buildInfo.ownerDescription = landlordInfo.description || '';

			//店铺信息
			if(this.intact.shopName && !this.intact.isBrand) {
				params.shopInfo.name = this.intact.shopName;
			}else if(this.intact.isBrand) {
				params.shopInfo.name = this.intact.brandName + (this.intact.branchName ? '('+this.intact.branchName+')': '');
			}else{
				params.shopInfo.name = '';
			}
			params.shopInfo.checkBrand = this.intact.isBrand ? 1 : 0;
			if(this.intact.brandName && this.intact.isBrand) {
				params.shopInfo.brandName = this.intact.brandName;
			}else{
				params.shopInfo.brandName = '';
			}
			if(this.intact.branchName && this.intact.isBrand) {
				params.shopInfo.branchShop= this.intact.branchName;
			}else{
				params.shopInfo.branchShop = '';
			}
			if(this.intact.operationType && this.intact.isBrand) {
				params.shopInfo.operateMode= +this.intact.operationType;
			}
			if(this.intact.industry && this.intact.industry.length) {
				params.shopInfo.industryId= this.intact.industry[0].code;
			}else{
				params.shopInfo.industryId=0;
			}
			if(this.openDate) {
				params.shopInfo.openDate= new Date(this.openDate).getTime();
			}else{
				params.shopInfo.openDate = 0;
			}
			if(this.intact.operateStatus) {
				params.shopInfo.operateStatus= +this.intact.operateStatus;
			}
			params.shopInfo.contact= this.intact.contactName || '';
			params.shopInfo.mobile= this.intact.contactMobile || '';
			params.shopInfo.outSaleMobile= this.intact.outSaleMobile || '';
			if(this.bStartTime) {
				params.shopInfo.operateTimeBegin = new Date(`2018-08-08 ${this.bStartTime}:00`).getTime();
			}else{
				params.shopInfo.operateTimeBegin = 0;
			}
			if(this.bEndTime) {
				params.shopInfo.operateTimeEnd = new Date(`2018-08-08 ${this.bEndTime}:00`).getTime();
			}else{
				params.shopInfo.operateTimeEnd = 0;
			}
			if(this.wholeDay) {
				params.shopInfo.operateTimeBegin = new Date(`2018-08-08 00:00:00`).getTime();
				params.shopInfo.operateTimeEnd = new Date(`2018-08-09 00:00:00`).getTime();
			}
			let weekSelectedItems = this.weekItems.filter(v => v.value);
			if(weekSelectedItems.length) {
				let weekArr = this.weekItems.map(v => {
					return v.value ? 1 : 0;
				}).reverse();
				params.shopInfo.operateWeek = weekArr.join('');
			}else{
				params.shopInfo.operateWeek = '';
			}
			if(this.intact.decorateGrade) {
				params.shopInfo.decorateGrade= +this.intact.decorateGrade;
			}
			let serviceSelectedArr = this.serviceItems.filter(v => v.value);
			if(serviceSelectedArr.length) {
				let serviceList = serviceSelectedArr.map(v => v.code);
				params.shopInfo.provideService = serviceList.join();
			}else{
				params.shopInfo.provideService = '';
			}
			params.shopInfo.rent = this.intact.shopRentFee ? this.intact.shopRentFee*100 : 0;
			if(this.intact.rentUnit) {
				params.shopInfo.rentUnit = +this.intact.rentUnit;
			}
			if(this.intact.rentPayMode != '---请选择---' && this.intact.rentPayMode != '自定义') {
				params.shopInfo.rentPayMode= this.intact.rentPayMode;
			}else if(this.intact.rentPayMode == '自定义' && this.myRentPayMode){
				params.shopInfo.rentPayMode= this.myRentPayMode;
			}else{
				params.shopInfo.rentPayMode= '';
			}
			if(this.intact.rentDepositMode != '---请选择---' && this.intact.rentDepositMode != '自定义') {
				params.shopInfo.rentDepositMode= this.intact.rentDepositMode;
			}else if(this.intact.rentDepositMode == '自定义' && this.myRentDepositMode){
				params.shopInfo.rentDepositMode= this.myRentDepositMode;
			}else{
				params.shopInfo.rentDepositMode= '';
			}
			if(this.intact.increase >= 0) {
				params.shopInfo.rentIsIncrease = +this.intact.increase;
			}else{
				params.shopInfo.rentIsIncrease = 0;
			}
			params.shopInfo.rentIncreaseNum = this.intact.increaseNum || '';
			if(this.leaseDate) {
				params.shopInfo.rentContractBeginDate = new Date(this.leaseDate).getTime();
			}else{
				params.shopInfo.rentContractBeginDate = 0;
			}
			params.shopInfo.rentContractMonths = this.intact.rentMonths ? +this.intact.rentMonths : 0;
			params.shopInfo.rentContractRemainMonths = this.intact.remainMonths ? +this.intact.remainMonths : 0;
			params.shopInfo.operatePrice = this.intact.operatePrice ? this.intact.operatePrice*100 : 0;
			params.shopInfo.operateDayVolume = this.intact.operateDayVolume ? this.intact.operateDayVolume*100 : 0;
			params.shopInfo.operateConsumer = this.intact.operateConsumer ? this.intact.operateConsumer : 0;
			let bestTimesArr = this.bestTimes.filter(v => v.value);
			if(bestTimesArr.length) {
				let bestTimesList = bestTimesArr.map(v => v.code);
				params.shopInfo.operateBestTimes = bestTimesList.join();
			}else{
				params.shopInfo.operateBestTimes = '';
			}
			params.shopInfo.operateNumInRoom = this.intact.operateNumInRoom || 0;
			params.shopInfo.operateOutSaleNum = this.intact.operateOutSaleNum || 0;
			params.shopInfo.operateVipNum = this.intact.operateVipNum || 0;
			params.shopInfo.operateVipMode = +this.intact.operateVipMode || null;
			params.shopInfo.description = this.intact.description || '';
			//转让信息
			params.shopInfo.transferStatus = +this.intact.transferStatus;
			params.shopInfo.transferFee = this.intact.transferFee ? this.intact.transferFee*1000000 : 0;
			if(this.intact.negotiable) {
				params.shopInfo.transferCanFace = +this.intact.negotiable;
			}
			if(this.intact.freeTransfer) {
				params.shopInfo.transferCanEmpty = +this.intact.freeTransfer;
			}
			if(this.intact.freeTransferFee && this.intact.freeTransfer == 2) {
				params.shopInfo.transferFaceFee = this.intact.freeTransferFee*1000000;
			}else{
				params.shopInfo.transferFaceFee = 0;
			}
			params.shopInfo.transferContent = this.intact.transferContent || '';
			params.shopInfo.transferReason = this.intact.transferReason || '';
			//图片列表
			params.shopInfo.photoList = [];
			if(this.doorPhotoList && this.doorPhotoList.length) {
				let doorList = this.doorPhotoList.map(v => { return {resourceId: v.id, resourceType: 1};});
				params.shopInfo.photoList = params.shopInfo.photoList.concat(doorList);
			}
			if(this.environmentPhotoList && this.environmentPhotoList.length) {
				let environmentList = this.environmentPhotoList.map(v => { return {resourceId: v.id, resourceType: 2};});
				params.shopInfo.photoList = params.shopInfo.photoList.concat(environmentList);
			}
			//老板信息
			if(this.bossList.length || this.bossListDel.length){
				let bossList2 = this.bossList.concat(this.bossListDel);
				let bossList3 = [];
				bossList2.forEach(v => {
					v = JSON.parse(JSON.stringify(v));
					if(v.phoneList && v.phoneList.length){
						v.mobile = v.mobile + ',' + v.phoneList.join();
					}
					delete v.phoneList;
					if(v.stock){
						v.stock = v.stock/100;
					}
					if(v.birthday){
						v.birthday = new Date(v.birthday).getTime();
					}
					if(v.gender){
						v.gender = +v.gender;
					}
					v.type = +v.type;
					if(!v.status){
						if(v.id){
							v.status = 1;
						}else {
							v.status = 0;
						}						
					}
					bossList3.push(v);
				})
				if(bossList3.length){
					params.bossList = bossList3;
				}
			}
			//员工信息
			if(this.employeeList.length || this.employeeListDel.length){
				let employeeList2 = this.employeeList.concat(this.employeeListDel);
				let employeeList3 = [];
				employeeList2.forEach(v => {
					v = JSON.parse(JSON.stringify(v));
					if(v.phoneList && v.phoneList.length){
						v.mobile = v.mobile + ',' + v.phoneList.join();
					}
					delete v.phoneList;
					if(v.enterDate){
						v.enterDate = new Date(v.enterDate).getTime();
					}
					if(v.quitDate){
						v.quitDate = new Date(v.quitDate).getTime();
					}
					if(v.gender){
						v.gender = +v.gender;
					}
					v.isQuit = v.isQuit ? 2 : 1;
					if(!v.status){
						if(v.id){
							v.status = 1;
						}else {
							v.status = 0;
						}						
					}
					employeeList3.push(v);
				})
				if(employeeList3.length){
					params.employeeList = employeeList3;
				}
			}
			//证件信息
			if(this.certificateList.length || this.certificateListDel.length){
				let certificateList2 = this.certificateList.concat(this.certificateListDel);
				let certificateList3 = [];
				certificateList2.forEach(v => {
					v = JSON.parse(JSON.stringify(v));
					if(v.photoList && v.photoList.length){
						v.photoIds = v.photoList.map(v => v.id);
					}
					if(!v.status){
						if(v.id){
							v.status = 1;
						}else {
							v.status = 0;
						}
					}
					if(v.pictures){
						delete v.pictures;
					}
					if(v.photoList){
						delete v.photoList;
					}
					certificateList3.push(v);
				})
				if(certificateList3.length){
					params.certificateList = certificateList3;
				}
			}

			let id = +this.route.snapshot.params.id;
			this.http.put(`shop/${id}`, params, data => {
				this.tip.setValue('修改成功！');
			})

		}, 1);

	}


}
