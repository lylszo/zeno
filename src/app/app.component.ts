import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from './service/http.service';
import {Subscription} from 'rxjs';
import {TipPopService} from './service/tipPop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  tip: object;  // 用于所有接口报错的信息提示
  subscription: Subscription;

  constructor(private http: HttpService, public tipService: TipPopService) {
    this.getDistrict();
    this.getIndustries();
    this.getCurrentCity();
    this.tip = {
      showError: false,
      errorText: '',
      success: false
    };
    this.subscription = this.tipService.getValue().subscribe((data) => {
      this.tip = data;
      setTimeout(() => {
        this.tip = {
          showError: false,
          errorText: '',
          success: false
        };
      }, 2000);
    });
  }

  //  在app启动的时候将区域的数据存到localstrage中
  getDistrict() {
    let districtStore = localStorage.getItem("district");
    if(!districtStore){
      this.http._get("district", {parent_id: -1}, (data) => {
        localStorage.setItem("district", JSON.stringify(data));
      })
    }

    let districtData = JSON.parse(districtStore);
    let districtMap = localStorage.getItem('cityMap');
    let cityListStr = localStorage.getItem("cityList");
    if (!districtMap || !cityListStr) {
      let cityObj = {};
      let cityList = [];
      districtData.forEach(function (item) {
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

  //获取当前城市放入localStorage
  getCurrentCity() {
    if(!localStorage.getItem('currentCity')) {
      let currentCity = {code: 4403, name: '深圳'};
      localStorage.setItem('currentCity', JSON.stringify(currentCity));
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
