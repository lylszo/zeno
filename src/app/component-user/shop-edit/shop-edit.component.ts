import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		this.initTime();
		this.onSCroll();
	}

	choose = [{code: 0, name: '---请选择---'}];

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
		{code: 1, name: '街道转角'},
		{code: 2, name: '学校'},
		{code: 3, name: '居民区'},
		{code: 4, name: '商业街'},
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

	//转让状态
	transferStatus = [
		{code: 1, name: '不转让', value: false},
		{code: 1, name: '转让中', value: false},
		{code: 1, name: '转让成功', value: false},
		{code: 1, name: '租约到期', value: false},
	];

	//老板身份
	bossIdentities = [
		{code: 1, name: '老板'},
		{code: 2, name: '合伙人'},
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

	//初始化日期类数据
	openDate: any;//开业日期
	leaseDate: any;//租约日期
	joinDate: any;//入职日期
	dimissionDate: any;//入职日期
	bossBirthday: any;//老板出生年月
	initTime() {
		//开业日期
		laydate.render({
			elem: '#openDate',
			max: new Date().getTime(),
			done: (value) => {
				this.openDate = value ? new Date(value).getTime() : undefined;
			}
	    });
		//租约日期
		laydate.render({
			elem: '#leaseDate',
			max: new Date().getTime(),
			done: (value) => {
				this.leaseDate = value ? new Date(value).getTime() : undefined;
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
		//老板出生年月
		laydate.render({
			elem: '#bossBirthday',
			done: (value) => {
				if(value) {
					this.bossBirthday = value;
				}
			}
	    });
		//入职日期
		laydate.render({
			elem: '#joinDate',
			done: (value) => {
				if(value) {
					this.joinDate = value;
				}
			}
	    });
		//离职日期
		laydate.render({
			elem: '#dimissionDate',
			done: (value) => {
				if(value) {
					this.dimissionDate = value;
				}
			}
	    });
	}

	//弹框
	@ViewChild('bossModal') bossModal: ModalDirective;
	@ViewChild('bossDelModal') bossDelModal: ModalDirective;
	@ViewChild('employeeModal') employeeModal: ModalDirective;
	@ViewChild('employeeDelModal') employeeDelModal: ModalDirective;
	//老板信息列表
	bossList = [
		{name: 'df'},
		{name: 'd324f'},
		{name: 'dewrf'},
		{name: 'dfg'},
	];
	//员工信息列表
	employeeList = [
		{name: 'df'},
		{name: 'd324f'},
		{name: 'dewrf'},
		{name: 'dfg'},
	];
	modalTitle: string = '添加';//是编辑还是添加
	//打开添加/编辑老板信息弹框
	openBoss(item) {
		this.modalTitle = item ? '编辑': '添加';
		this.bossModal.show();
	}

	//确定添加/编辑老板信息
	submitBoss() {
		this.bossModal.hide();
	}

	//确定删除老板信息
	delBoss() {
		this.bossDelModal.hide();
	}

	//打开添加/编辑员工信息弹框
	openEmployee(item) {
		this.modalTitle = item ? '编辑': '添加';
		this.employeeModal.show();
	}
	
	//确定添加/编辑员工信息
	submitEmployee() {
		this.employeeModal.hide();
	}

	//确定删除员工信息
	delEmployee() {
		this.employeeDelModal.hide();
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
	scrollActive: string = 'jianzhu';
	scrollArr = ['wuyejianzhu', 'weizhi', 'jianzhu', 'wuye', 'dianpu', 'jiben', 'laoban', 'yuangong', 'tupian', 'zhengjian', 'zhuanrang'];
	onSCroll() {
		window.onscroll = e => {
			let top = $("html,body").scrollTop();
			this.scrollArr.forEach(v => {
				let thisTop = $('#' + v).offset().top - 84;
				if(top >= thisTop){
					this.scrollActive = v;
				}
			})
		}		
	}


}
