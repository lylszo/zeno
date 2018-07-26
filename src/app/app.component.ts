import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './shared/service/http.service';
import { Subscription } from 'rxjs';
import { TipPopService } from './shared/service/tipPop.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('zh-cn', deLocale);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  tip: object;  // 用于所有接口报错的信息提示
  subscription: Subscription;

  constructor(private http: HttpService, public tipService: TipPopService, private localeService: BsLocaleService) {
    this.localeService.use('zh-cn');
    this.getDistrict();
    this.getIndustries();
    this.tip = {
      showError: false,
      errorText: '',
      fail: false
    };
    this.subscription = this.tipService.getValue().subscribe((data) => {
      this.tip = data;
      setTimeout(() => {
        this.tip = {
          showError: false,
          errorText: '',
          fail: false
        };
      }, 3000);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  //  在app启动的时候将区域的数据存到localStorage中
  getDistrict() {
    let districtStore = localStorage.getItem("district");
    if (!districtStore) {
      this.http._get("district", {parent_id: -1}, (data) => {
        localStorage.setItem("district", JSON.stringify(data));
        this.putToStorage(data);
      })
    } else {
      let districtData = JSON.parse(districtStore);
      this.putToStorage(districtData);
    }

  }

  putToStorage(data: Array<any>) {
    let districtMap = localStorage.getItem('cityMap');
    let cityListStr = localStorage.getItem("cityList");
    if (!districtMap || !cityListStr) {
      let cityObj = {};
      let cityList = [];
      data.forEach(function (item) {
        let value = item.code.toString();
        cityObj[value] = item.name;
        if(item.code.toString().length === 4) {
          cityList.push(item);
        }
      });
      localStorage.setItem('cityMap', JSON.stringify(cityObj));
      localStorage.setItem("cityList", JSON.stringify(cityList));
    }
  }

  // 获取行业放入localstorage
  getIndustries() {
    if (!localStorage.getItem('industry')) {
      this.http._get('industryList', '', (data) => {
        localStorage.setItem('industry', JSON.stringify(data));
      });
    }
  }



}
