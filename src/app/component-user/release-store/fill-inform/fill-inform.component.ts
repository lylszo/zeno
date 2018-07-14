import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { TipPopService} from '../../../service/tipPop.service';
import { HttpService } from "../../../service/http.service";

@Component({
  selector: 'app-fill-inform',
  templateUrl: './fill-inform.component.html',
  styleUrls: ['./fill-inform.component.scss']
})
export class FillInformComponent implements OnInit {

	constructor(private router: Router, private tip: TipPopService, private http: HttpService) { }

	ngOnInit() {
		this.scrollTo();
		this.initTime();
		this.onScroll();
	}

	//是否精简版
	isEasy: boolean = true;
	easyDl = false;
	//切换精简、完整
	toggleSort(sort) {
		this.isEasy = sort;
		this.easyDl = false;
		this.easySubmitted = false;
		this.intactSubmitted = false;
		if(sort){
			this.scrollArr = ['wuyejianzhuEasy', 'dianpuEasy', 'zhuanrangEasy'];
			this.scrollActive = 'wuyejianzhuEasy';
		}else{
			this.scrollArr = ['wuyejianzhu', 'weizhi', 'jianzhu', 'wuye', 'fangdong', 'dianpu', 'jiben', 'laoban', 'yuangong', 'tupian', 'zhengjian', 'zhuanrang'];
			this.scrollActive = 'wuyejianzhu';
		}
		this.scrollTo();
		setTimeout(() => {
			this.easyDl = true;
		}, 10)
	}

	//精简版表单数据初始化
	easy:any = {
		positionDesc: 0,
		rentUnit: 1,
		operationType: 0,
		nearStreet: 0,
		negotiable: 0,
		freeTransfer: 0,
		transferStatus: 1,
		distrcitId: 0,

	};
	//完整版表单数据初始化
	intact:any = {
		positionDesc: 0,
		rentUnit: 1,
		operationType: 0,
		nearStreet: 0,
		negotiable: 0,
		freeTransfer: 0,
		transferStatus: 1,
		parentProperty: 0,
		decorateGrade: 0,
		propertyRight: 0,
		removeRisk: -1,
		landlordIdentity: 1,
		operateStatus: 0,
		buildingShape: 0,
		operateVipMode: 0,
		bossIdentity: 2,
		increase: -1
	};
	//是否提交过表单
	easySubmitted = false;
	intactSubmitted = false;

	code = 0;
	choose = [{code: 0, name: '---请选择---'}];

	//租金单位
	rentUnit = [
		{code: 1, name: '元/月'},
		{code: 2, name: '元/天'},
		{code: 3, name: '万元/年'},
		{code: 4, name: '元/平米*月'},
		{code: 5, name: '元/平米*天'}
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
		{code: 0, name: '---请选择---'},
		{code: 1, name: '临街'},
		{code: 2, name: '不临街'}
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
	removeRisk = [
		{code: -1, name: '---请选择---'},
		{code: 1, name: '有'},
		{code: 0, name: '无'}
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
	operateVipMode = [
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
		{code: 5, name: '停车位（10个）', value: false},
		{code: 6, name: '上水', value: false},
		{code: 7, name: '排烟', value: false},
		{code: 8, name: '中央空调', value: false},
		{code: 9, name: '网络', value: false},
		{code: 10, name: '天然气', value: false},
		{code: 11, name: '外摆区（50㎡）', value: false},
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
			max: new Date().getTime(),
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
	landlord:any = {};
	landlordList:any = [];
	landlordIndex:any;
	landlordPhoneAdd() {
		this.phoneNum++;
		this.landlord.phoneList.push({
			code: this.phoneNum
		});
	}
	landlordPhoneDel(i) {
		this.landlord.phoneList.splice(i, 1);
	}
	//打开添加/编辑房东信息弹框
	openLandlord(item) {
		this.modalTitle = item ? '编辑': '添加';
		this.landlord = item || {
			phoneList: []
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
	boss:any = {};
	bossList = [];
	bossIndex:any;
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
	openBoss(item) {
		this.modalTitle = item ? '编辑': '添加';
		//是否已选老板身份
		let chooseBossIdentity = false;
		this.bossList.forEach(v => {
			if(v.identity === 0 || v.identity === '0') {
				chooseBossIdentity = true;
			}
		})
		let defaultItem = {
			identity: 0,
			phoneList: []
		}
		if(chooseBossIdentity) {
			this.bossIdentities = [
				{code: 1, name: '合伙人'},
			];
			defaultItem.identity = 1;
		}else {
			this.bossIdentities = [
				{code: 0, name: '老板'},
				{code: 1, name: '合伙人'},
			];
			defaultItem.identity = 0;
		}
		this.boss = item || defaultItem;
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
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.bossModal.hide();
	}
	//打开删除老板信息
	openBossDel(idx){
		this.bossDelModal.show();
		this.bossIndex = idx;
	}

	//确定删除老板信息
	delBoss() {
		this.bossList.splice(this.bossIndex, 1);
		this.bossDelModal.hide();
	}

	//员工信息列表
	employee:any = {};
	employeeList = [];
	employeeIndex:any;
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
	openEmployee(item) {
		this.modalTitle = item ? '编辑': '添加';
		this.employee = item || {
			phoneList: []
		};
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
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.employeeModal.hide();
	}
	// 打开删除老板信息
	openEmployeeDel(idx){
		this.employeeDelModal.show();
		this.employeeIndex = idx;
	}

	//确定删除员工信息
	delEmployee() {
		this.employeeList.splice(this.employeeIndex, 1);
		this.employeeDelModal.hide();
	}
	//添加证件信息
	certificate:any = {
		type: -1
	};
	certificateList = [];
	clickCertificatePhoto;
	certificateIndex:any;

	//打开添加或编辑证件弹框
	openCertificate(item) {
		this.clickCertificatePhoto = false;
		this.modalTitle = item ? '编辑': '添加';
		this.certificate = item || {
			type: -1,
			photoIds: []
		};
		this.certificateModal.show();
	}

	//提交证件
	submitCertificate(form){
		if(form.invalid || this.certificate.type == -1 || !this.certificate.photoIds || !this.certificate.photoIds.length || (this.certificate.certificateType == '0' && !this.certificate.certificateName)){
			this.tip.setValue('请按提示输入正确的数据！', true);
			return;
		}
		if(this.modalTitle == '添加'){
			this.certificateList.push(this.certificate);
		}
		this.tip.setValue(`${this.modalTitle}成功！`);
		this.certificateModal.hide();
	}

	//打开删除证件弹框
	openCertificateDel(idx){
		this.certificateDelModal.show();
		this.certificateIndex = idx;
	}

	//删除证件
	delCertificate(){
		this.certificateList.splice(this.certificateIndex, 1);
		this.certificateDelModal.hide();
	}

	//回到顶部
	scrollTo(id?) {
		if(id){
			$("html,body").finish().animate({"scrollTop":$('#'+id).offset().top - 84},  300);
		}else {
			$("html,body").finish().animate({"scrollTop":"0px"}, 400);
		}
	}
	//监听滚动事件
	scrollActive: string = 'wuyejianzhuEasy';
	scrollArr = ['wuyejianzhuEasy', 'dianpuEasy', 'zhuanrangEasy'];
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

	//立即发布
	post() {
		//点击了提交显示可能出现错误信息
		if(this.isEasy){
			this.easySubmitted = true;
		}else{
			this.intactSubmitted = true;
		}
		//检查错误
		setTimeout(() => {
			let errors: any;
			if(this.isEasy){
				errors = $('.easy').find('.error').find('span');
			}else {
				errors = $('.intact').find('.error').find('span');
			}

			if(errors.length) {
				$("html,body").finish().animate({"scrollTop":$(errors[0]).parent().parent().parent().offset().top - 84},  300);
				this.tip.setValue('请按提示输入正确的数据！', true);
				return;
			}
			let params:any = {
				buildInfo: {},
				shopInfo: {}
			};
			if(this.isEasy) {
				if(this.easy.distrcitId) {
					params.buildInfo.district = this.easy.distrcitId;
					params.buildInfo.city = +this.easy.distrcitId.toString().slice(0, 4);
				}
				if(this.easy.detailAddress) {
					params.buildInfo.address = this.easy.detailAddress;
				}
				if(this.easy.point) {
					params.buildInfo.latitude = this.easy.point.lat;
					params.buildInfo.longitude = this.easy.point.lng;
				}
				if(this.easy.positionDesc) {
					params.buildInfo.positionDesc = +this.easy.positionDesc;
				}
				if(this.easy.nearStreet) {
					params.buildInfo.nearStreet = +this.easy.nearStreet;
				}
				if(this.easy.buildingArea) {
					params.buildInfo.area = this.easy.buildingArea;
				}
				if(this.easy.shopName && !this.easy.isBrand) {
					params.shopInfo.name = this.easy.shopName;
				}
				if(this.easy.isBrand) {
					params.shopInfo.name = this.easy.brandName + (this.easy.branchName ? '('+this.easy.branchName+')': '');
				}
				params.shopInfo.checkBrand = this.easy.isBrand ? 1 : 0;
				if(this.easy.brandName && this.easy.isBrand) {
					params.shopInfo.brandName = this.easy.brandName;
				}
				if(this.easy.branchName && this.easy.isBrand) {
					params.shopInfo.branchShop= this.easy.branchName;
				}
				if(this.easy.operationType && this.easy.isBrand) {
					params.shopInfo.operateMode= +this.easy.operationType;
				}
				if(this.easy.industry && this.easy.industry.length) {
					params.shopInfo.industryId= this.easy.industry[0].code;
				}
				if(this.easy.contactName) {
					params.shopInfo.contact= this.easy.contactName;
				}
				if(this.easy.contactMobile) {
					params.shopInfo.mobile= this.easy.contactMobile;
				}
				if(this.easy.shopRentFee) {
					params.shopInfo.rent= this.easy.shopRentFee*100;
				}
				if(this.easy.rentUnit) {
					params.shopInfo.rentUnit= this.easy.rentUnit;
				}
				if(this.easy.payWayGive) {
					params.shopInfo.rentPayMode= this.easy.payWayGive;
				}
				if(this.easy.payWayPut) {
					params.shopInfo.rentDepositMode= this.easy.payWayPut;
				}
				if(this.easy.transferStatus) {
					params.shopInfo.transferStatus= +this.easy.transferStatus;
				}
				if(this.easy.transferFee) {
					params.shopInfo.transferFee= this.easy.transferFee*1000000;
				}
				if(this.easy.negotiable) {
					params.shopInfo.transferCanFace= this.easy.negotiable;
				}
				if(this.easy.freeTransfer) {
					params.shopInfo.transferCanEmpty= this.easy.freeTransfer;
				}
				if(this.easy.freeTransferFee && this.easy.freeTransfer == 2) {
					params.shopInfo.transferFaceFee= this.easy.freeTransferFee*1000000;
				}
			}else {
				//建筑信息
				if(this.intact.distrcitId) {
					params.buildInfo.district = this.intact.distrcitId;
					params.buildInfo.city = +this.easy.distrcitId.toString().slice(0, 4);
				}
				if(this.intact.detailAddress) {
					params.buildInfo.address = this.intact.detailAddress;
				}
				if(this.intact.point) {
					params.buildInfo.latitude = this.intact.point.lat;
					params.buildInfo.longitude = this.intact.point.lng;
				}
				if(this.intact.positionDesc) {
					params.buildInfo.positionDesc = +this.intact.positionDesc;
				}
				if(this.intact.nearStreet) {
					params.buildInfo.nearStreet = +this.intact.nearStreet;
				}
				if(this.intact.buildingArea) {
					params.buildInfo.area = +this.intact.buildingArea;
				}
				if(this.intact.useArea) {
					params.buildInfo.useArea = +this.intact.useArea;
				}
				if(this.intact.width) {
					params.buildInfo.width = +this.intact.width;
				}
				if(this.intact.deep) {
					params.buildInfo.deep = +this.intact.deep;
				}
				if(this.intact.doorWidth) {
					params.buildInfo.doorWidth = +this.intact.doorWidth;
				}
				if(this.intact.height) {
					params.buildInfo.height = +this.intact.height;
				}
				if(this.intact.floor) {
					params.buildInfo.floor = this.intact.floor;
				}
				if(this.intact.floorNum) {
					params.buildInfo.floorNum = +this.intact.floorNum;
				}
				if(this.intact.suitIndustry && this.intact.suitIndustry.length) {
					let suitList = this.intact.suitIndustry.map(v => v.code);
					params.buildInfo.suitIndustry = suitList.join();
				}
				if(this.intact.unsuitIndustry && this.intact.unsuitIndustry.length) {
					let suitList = this.intact.unsuitIndustry.map(v => v.code);
					params.buildInfo.unsuitIndustry = suitList.join();
				}
				if(this.intact.recommendIndustry && this.intact.recommendIndustry.length) {
					let suitList = this.intact.recommendIndustry.map(v => v.code);
					params.buildInfo.recommendarIndustry = suitList.join();
				}
				if(this.intact.parentProperty) {
					params.buildInfo.parentProperty = +this.intact.parentProperty;
				}
				let propertySelectedArr = this.properties.filter(v => v.value);
				if(propertySelectedArr.length) {
					let propertyList = propertySelectedArr.map(v => v.code);
					params.buildInfo.propertyMatch = propertyList.join();
				}
				if(this.intact.waterFee) {
					params.buildInfo.waterFee = this.intact.waterFee*100;
				}
				if(this.intact.electricityFee) {
					params.buildInfo.electricityFee = this.intact.electricityFee*100;
				}
				if(this.intact.propertyFee) {
					params.buildInfo.propertyFee = this.intact.propertyFee*100;
				}
				if(this.intact.rentFee) {
					params.buildInfo.rent = this.intact.rentFee*100;
				}
				if(this.intact.gasFee) {
					params.buildInfo.gasFee = this.intact.gasFee*100;
				}
				if(this.intact.warmAirFee) {
					params.buildInfo.warmAirFee = this.intact.warmAirFee*100;
				}
				if(this.intact.buildingShape) {
					params.buildInfo.shape = +this.intact.buildingShape;
				}
				if(this.intact.propertyRight) {
					params.buildInfo.propertyRight = +this.intact.propertyRight;
				}
				if(this.intact.removeRisk >= 0) {
					params.buildInfo.risk = +this.intact.removeRisk;
				}
				if(this.intact.riskDescription && this.intact.removeRisk == 1) {
					params.buildInfo.riskDescription = this.intact.riskDescription;
				}

				// 房东信息
				if(this.landlordList.length){
					let landlordInfo = this.landlordList[0];
					if(landlordInfo.nickname){
						params.buildInfo.ownerNickname = landlordInfo.nickname;
					}
					if(landlordInfo.phone){
						if(landlordInfo.phoneList.length){
							params.buildInfo.ownerMobile = landlordInfo.phone + ',' + landlordInfo.phoneList.join();
						}else{
							params.buildInfo.ownerMobile = landlordInfo.phone;
						}
					}
					if(landlordInfo.name){
						params.buildInfo.ownerName = landlordInfo.name;
					}
					if(landlordInfo.birthday){
						params.buildInfo.ownerBirthday = new Date(landlordInfo.birthday).getTime();
					}
					if(landlordInfo.email){
						params.buildInfo.ownerEmail = landlordInfo.email;
					}
					if(landlordInfo.address){
						params.buildInfo.ownerAddress = landlordInfo.address;
					}
					if(landlordInfo.qq){
						params.buildInfo.ownerQq = landlordInfo.qq;
					}
					if(landlordInfo.wechart){
						params.buildInfo.ownerWechat = landlordInfo.wechart;
					}
					if(landlordInfo.description){
						params.buildInfo.ownerDescription = landlordInfo.description;
					}
				}

				//店铺信息
				if(this.intact.shopName && !this.intact.isBrand) {
					params.shopInfo.name = this.intact.shopName;
				}
				if(this.intact.isBrand) {
					params.shopInfo.name = this.intact.brandName + (this.intact.branchName ? '('+this.intact.branchName+')': '');
				}
				params.shopInfo.checkBrand = this.intact.isBrand ? 1 : 0;
				if(this.intact.brandName && this.intact.isBrand) {
					params.shopInfo.brandName = this.intact.brandName;
				}
				if(this.intact.branchName && this.intact.isBrand) {
					params.shopInfo.branchShop= this.intact.branchName;
				}
				if(this.intact.operationType && this.intact.isBrand) {
					params.shopInfo.operateMode= +this.intact.operationType;
				}
				if(this.intact.industry && this.intact.industry.length) {
					params.shopInfo.industryId= this.intact.industry[0].code;
				}
				if(this.openDate) {
					params.shopInfo.openDate= new Date(this.openDate).getTime();
				}
				if(this.intact.operateStatus) {
					params.shopInfo.operateStatus= +this.intact.operateStatus;
				}
				if(this.intact.contactName) {
					params.shopInfo.contact= this.intact.contactName;
				}
				if(this.intact.contactMobile) {
					params.shopInfo.mobile= this.intact.contactMobile;
				}
				if(this.intact.outSaleMobile) {
					params.shopInfo.outSaleMobile= this.intact.outSaleMobile;
				}
				if(this.bStartTime) {
					params.shopInfo.operateTimeBegin = new Date(`2018-08-08 ${this.bStartTime}:00`).getTime();
				}
				if(this.bEndTime) {
					params.shopInfo.operateTimeEnd = new Date(`2018-08-08 ${this.bEndTime}:00`).getTime();
				}
				if(this.wholeDay) {
					params.shopInfo.operateTimeEnd = new Date(`2018-08-08 00:00:00`).getTime();
					params.shopInfo.operateTimeBegin = new Date(`2018-08-08 23:59:59`).getTime();
				}
				let weekSelectedItems = this.weekItems.filter(v => v.value);
				if(weekSelectedItems.length) {
					let weekArr = this.weekItems.map(v => {
						return v.value ? 1 : 0;
					})
					params.shopInfo.operateWeek = +weekArr.join('');
				}
				if(this.intact.decorateGrade) {
					params.shopInfo.decorateGrade= +this.intact.decorateGrade;
				}
				let serviceSelectedArr = this.serviceItems.filter(v => v.value);
				if(serviceSelectedArr.length) {
					let serviceList = serviceSelectedArr.map(v => v.code);
					params.shopInfo.provideService = serviceList.join();
				}
				if(this.intact.shopRentFee) {
					params.shopInfo.rent = this.intact.shopRentFee*100;
				}
				if(this.intact.rentUnit) {
					params.shopInfo.rentUnit = this.intact.rentUnit;
				}
				if(this.intact.payWayGive) {
					params.shopInfo.rentPayMode = this.intact.payWayGive;
				}
				if(this.intact.payWayPut) {
					params.shopInfo.rentDepositMode = this.intact.payWayPut;
				}
				if(this.intact.increase >= 0) {
					params.shopInfo.rentIsIncrease = this.intact.increase;
				}
				if(this.intact.increaseNum) {
					params.shopInfo.rentIncreaseNum = this.intact.increaseNum;
				}
				if(this.leaseDate) {
					params.shopInfo.rentContractBeginDate = new Date(this.leaseDate).getTime();
				}
				if(this.intact.rentMonths) {
					params.shopInfo.rentContractMonths = this.intact.rentMonths;
				}
				if(this.intact.remainMonths) {
					params.shopInfo.rentContractRemainMonths = this.intact.remainMonths;
				}
				if(this.intact.operatePrice) {
					params.shopInfo.operatePrice = this.intact.operatePrice*100;
				}
				if(this.intact.operateDayVolume) {
					params.shopInfo.operateDayVolume = this.intact.operateDayVolume*100;
				}
				if(this.intact.operateConsumer) {
					params.shopInfo.operateConsumer = this.intact.operateConsumer;
				}
				if(this.intact.operateBestTimes) {
					params.shopInfo.operateBestTimes = this.intact.operateBestTimes;
				}
				if(this.intact.operateNumInRoom) {
					params.shopInfo.operateNumInRoom = this.intact.operateNumInRoom;
				}
				if(this.intact.operateOutSaleNum) {
					params.shopInfo.operateOutSaleNum = this.intact.operateOutSaleNum;
				}
				if(this.intact.operateVipNum) {
					params.shopInfo.operateVipNum = this.intact.operateVipNum;
				}
				if(this.intact.operateVipMode) {
					params.shopInfo.operateVipMode = this.intact.operateVipMode;
				}
				if(this.intact.description) {
					params.shopInfo.description = this.intact.description;
				}
				//转让信息
				if(this.intact.transferStatus) {
					params.shopInfo.transferStatus = +this.intact.transferStatus;
				}
				if(this.intact.transferFee) {
					params.shopInfo.transferFee = this.intact.transferFee*1000000;
				}
				if(this.intact.negotiable) {
					params.shopInfo.transferCanFace = +this.intact.negotiable;
				}
				if(this.intact.freeTransfer) {
					params.shopInfo.transferCanEmpty = +this.intact.freeTransfer;
				}
				if(this.intact.freeTransferFee && this.intact.freeTransfer == 2) {
					params.shopInfo.transferFaceFee = this.intact.freeTransferFee*1000000;
				}
				if(this.intact.transferContent) {
					params.shopInfo.transferContent = this.intact.transferContent;
				}
				if(this.intact.transferReason) {
					params.shopInfo.transferReason = this.intact.transferReason;
				}
				//图片列表
				if(this.doorPhotoList && this.doorPhotoList.length) {
					let doorList = this.doorPhotoList.map(v => { return {resourceId: v.id, resourceType: 1};});
					params.shopInfo.photoList = params.shopInfo.photoList || [];
					params.shopInfo.photoList = params.shopInfo.photoList.concat(doorList);
				}
				if(this.environmentPhotoList && this.environmentPhotoList.length) {
					let environmentList = this.environmentPhotoList.map(v => { return {resourceId: v.id, resourceType: 2};});
					params.shopInfo.photoList = params.shopInfo.photoList || [];
					params.shopInfo.photoList = params.shopInfo.photoList.concat(environmentList);
				}
				//老板信息
				if(this.bossList.length){
					let bossList2 = this.bossList.concat();
					bossList2.forEach(v => {
						if(v.phoneList && v.phoneList.length){
							v.mobile = v.mobile + ',' + v.phoneList.join();
						}
						delete v.phoneList;
						if(v.stock){
							v.stock = v.stock/100;
						}
						v.birthday = new Date(v.birthday).getTime();
					})
					params.bossList = bossList2;
				}
				//员工信息
				if(this.employeeList.length){
					let employeeList2 = this.employeeList.concat();
					employeeList2.forEach(v => {
						if(v.phoneList && v.phoneList.length){
							v.mobile = v.mobile + ',' + v.phoneList.join();
						}
						delete v.phoneList;
						v.enterDate = new Date(v.enterDate).getTime();
						v.quitDate = new Date(v.quitDate).getTime();
						v.isQuit = v.isQuit ? 2 : 1;
					})
					params.employeeList = employeeList2;
				}
				//证件信息
				if(this.certificateList.length){
					let certificateList2 = this.certificateList.concat();
					certificateList2.forEach(v => {
						if(v.photoIds && v.photoIds.length){
							v.photoIds = v.photoIds.map(v => v.id);
						}
					})
					params.certificateList = certificateList2;
				}
			}

			this.http.post('shop', params, data => {
				this.tip.setValue('发布成功！');
				setTimeout(() => {
					this.router.navigate(['/user/releaseOk/' + data.shopId]);
				}, 500);
			})

		}, 1);

	}


}
