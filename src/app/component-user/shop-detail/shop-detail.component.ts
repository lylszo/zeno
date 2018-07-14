import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {CommonService} from '../../service/common.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  //图片列表
  imgs = [];
  //环境图片列表
  environmentImgs = [];
  //门面图片列表
  shopFrontImgs = [];

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

  //是否登录
  login: boolean;

  //当前图片的index
  idx: number = 0;
  //图片列表margin-left
  imgLeft: number = 0;
  //经纬度
  position;

  historyList: Array<any>=[];
  operator: any;
  shopId: any;

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private cookie: CookieService, private http: HttpService, private common: CommonService) {
    this.common.getUserDetail((data) => {
      this.operator = data.userId;
    });
  }

  ngOnInit() {
    this.shopId = this.route.snapshot.params.id;
    this.login = this.cookie.get("Authorization") ? true : false;
    this.onScroll();
    this.getDetail();
    this.getHistoryList();
    this.getBoss();
    this.getEmployee();
    this.getCertificate();
  }

  getHistoryList() {
    let param = {
      targetId: this.shopId,
      operator: this.operator,
      page: 1,
      pageSize: 1000
    };
    this.http.get('histories', param, (data) => {
      this.historyList = [{operateTime:"2018 06-09",operName:'lyl',subject:"创建"},
        {operateTime:"2018 06-09",operName:'lyl',subject:"修改位置",content:["修改前:100，100, 修改后:200，200"]},
        {operateTime:"2018 06-09",operName:'lyl',subject:"修改位置",content:"修改前:100，100, 修改后:200，200"},
        {operateTime:"2018 06-09",operName:'lyl',subject:"修改位置",content:"修改前 :100，100, 修改后:200，200"}]
    });
  }

  //点击箭头切换图片
  turn(sort, list = []) {
    if(!this.imgs || (this.imgs && this.imgs.length && this.imgs.length <= 5)){
      return;
    }
    if (sort == 'left') {
      this.idx == 0 ? this.idx = list.length - 1 : this.idx--;
    } else if (sort == 'right') {
      this.idx == list.length - 1 ? this.idx = 0 : this.idx++;
    }
    if (this.idx == 0) {
      this.imgLeft = 0;
    } else if (this.idx > 3) {
      this.imgLeft = -(this.idx - 3) * 135;
    }
  }

  //回到顶部
  scrollTo(id) {
    if (id) {
      $('html,body').finish().animate({'scrollTop': $('#' + id).offset().top - 84}, 300);
    } else {
      $('html,body').finish().animate({'scrollTop': '0px'}, 400);
    }
  }

  //监听滚动事件
  scrollActive: string = 'jianzhu';
  scrollArr = ['jianzhu', 'wuye', 'dianpu', 'jingying', 'zhuanrang', 'tupian', 'weizhi'];

  onScroll() {
    window.onscroll = e => {
      if (this.scrollArr) {
        let top = $('html,body').scrollTop();
        this.scrollArr.forEach(v => {
          if ($('#' + v).offset()) {
            let thisTop = $('#' + v).offset().top - 84;
            if (top >= thisTop) {
              this.scrollActive = v;
            }
          }
        });
      }
    };
  }

  //获取商机详情
  detail = {};

  //获取店铺详情
  getDetail() {
    let id = this.route.snapshot.params.id;
    let method = this.cookie.get('Authorization') ? 'get' : '_get';
    this.http[method](`shop/${id}`, '', data => {
      this.detail = data;
      if (data.photoList && data.photoList.length) {
        this.imgs = data.photoList;
        this.shopFrontImgs = data.photoList.filter(v => v.resourceType == 1);
        this.environmentImgs = data.photoList.filter(v => v.resourceType == 2);
      }else{
        this.imgs = [{url: '../../../assets/imgs/default.png'}];
      }

      if (data.buildVo && data.buildVo.latitude && data.buildVo.longitude) {
        this.position = {
          lng: data.buildVo.longitude,
          lat: data.buildVo.latitude
        };
      }

      if(data.provideService){
        let arr = data.provideService.split(',');
        this.serviceItems.forEach(v => {
          arr.forEach(w => {
            if(v.code == w){
              v.value = true;
            }
          })
        })
      }

      if(data.buildVo && data.buildVo.propertyMatch){
        let arr = data.buildVo.propertyMatch.split(',');
        this.properties.forEach(v => {
          arr.forEach(w => {
            if(v.code == w){
              v.value = true;
            }
          })
        })
      }

      if(data.buildVo && data.buildVo.suitIndustry){
        data.buildVo.suitIndustry = data.buildVo.suitIndustry.split(',');
      }

      if(data.buildVo && data.buildVo.unsuitIndustry){
        data.buildVo.unsuitIndustry = data.buildVo.unsuitIndustry.split(',');
      }

      if(data.buildVo && data.buildVo.recommendarIndustry){
        data.buildVo.recommendarIndustry = data.buildVo.recommendarIndustry.split(',');
      }

    });
  }

  //获取老板信息
  bossList:any = [];
  getBoss() {
    let id = this.route.snapshot.params.id;
    let params = {
      shopId: id,
      page: 1,
      pageSize: 100
    };
    let method = this.login ? 'get' : '_get';
    this.http[method]('shopBosses', params, data => {
      let list = data.items.concat();
      let newList:any = [];
      if(list.length) {
        list.forEach(v => {
          let obj:any = {};
          obj.type = v.type;
          obj.nickname = v.practitionersVo.nickname;
          obj.gender = v.practitionersVo.gender;
          if(v.practitionersVo.mobile) {
            let mobiles = v.practitionersVo.mobile.split(',');
            if(mobiles.length == 1){
              obj.mobile = mobiles[0];
            }else {
              obj.mobile = mobiles[0];
            }
          }
          obj.districtId = v.practitionersVo.districtId;
          obj.stock = v.stock/100;
          obj.realName = v.practitionersVo.realName;
          if(v.practitionersVo.birthday){
            obj.birthday = this.datePipe.transform(v.practitionersVo.birthday, "yyyy-MM-dd");
          }
          obj.email = v.practitionersVo.email;
          obj.otherAccountQq = v.practitionersVo.otherAccountQq;
          obj.otherAccountWx = v.practitionersVo.otherAccountWx;
          obj.otherDescription = v.practitionersVo.otherDescription;
          newList.push(obj);
        })
        this.bossList = newList.concat();
      }
    })
  }

  //获取员工信息
  employeeList:any = [];
  getEmployee() {
    let id = this.route.snapshot.params.id;
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
          obj.gender = v.practitionersVo.gender;
          if(v.practitionersVo.mobile) {
            let mobiles = v.practitionersVo.mobile.split(',');
            if(mobiles.length == 1){
              obj.mobile = mobiles[0];
            }else {
              obj.mobile = mobiles[0];
            }
          }
          obj.realName = v.practitionersVo.realName;
          if(v.enterDate){
            obj.enterDate = this.datePipe.transform(v.enterDate, "yyyy-MM-dd");
          }
          obj.isQuit = v.isQuit;
          if(v.quitDate){
            obj.quitDate = this.datePipe.transform(v.quitDate, "yyyy-MM-dd");
          }
          obj.jobDescription = v.jobDescription;
          newList.push(obj);
        })
        this.employeeList = newList.concat();
      }
    })
  }
  //获取证件信息
  certificateList:any = [];
  certificatePicList:any = [];
  getCertificate() {
    let id = this.route.snapshot.params.id;
    let params = {
      shopId: id,
      page: 1,
      pageSize: 100
    };
    let method = this.login ? 'get' : '_get';
    this.http[method]('shopCertificates', params, data => {
      let list:any = (data && data.items) ? data.items.concat() : [];
      if(list.length) {
        list.forEach(v => {
          if(v.photoList && v.photoList){
            this.certificatePicList.concat(v.photoList);
          }
        })
        this.certificateList = list.concat();
      }
    })
  }

  //计算列表中的租金剩余时间
  getRemainMonth(total: any, begin: any) {
    let now = new Date().getTime();
    let num = parseInt((now - begin) / (86400000 * 30) + '') + 1;
    if (total - num > 0) {
      return (total - num);
    } else {
      return 0;
    }
  }


}
