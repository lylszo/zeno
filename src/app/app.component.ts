import {Component} from '@angular/core';
import {DistrictService} from './service/district.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(public district: DistrictService) {
    this.getDistrict()
  }
    //  在app启动的时候将区域的数据存到localstrage中
    getDistrict(){
      // let districtStore = JSON.parse(localStorage.getItem("district"));
      // if(!districtStore){
      //   this.district.getDistrict('0',(data) => {
      //     localStorage.setItem("district", JSON.stringify(data))
      //   })
      // }
      this.district.getDistrict('0',(data) => {
        console.log('district',data)
        // localStorage.setItem("district", JSON.stringify(data))
      })
  }
}
