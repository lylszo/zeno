import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cityName'
})
export class CityNamePipe implements PipeTransform {
  // 省市区商圈
  transform(value: any) {
    if(!value){
      return '';
    }
    let code = value.toString();
    let cityObjData = localStorage.getItem('cityMap');
    if (!cityObjData) {
      let districtStore = localStorage.getItem('district');
      let districtData = JSON.parse(districtStore);
      let cityObj = {};
      districtData.forEach(function (item) {
        cityObj[item.code] = item.name;
      });
      localStorage.setItem('cityMap', JSON.stringify(cityObj));

      return cityObj[code];
    } else {
      let cityObj = JSON.parse(cityObjData);
      if(!cityObj[code]){
        code = 0
      }
      return cityObj[code];
    }
  }

}
