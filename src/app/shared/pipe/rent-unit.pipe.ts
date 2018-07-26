import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentUnit'
})
export class RentUnitPipe implements PipeTransform {
  // 租金单位
  transform(value: any, args?: any): any {
    let list = {
  		1: '元/月',
  		2: '元/天',
  		3: '万元/年',
  		4: '元/平米*月',
  		5: '元/平米*天'
  	};
    return list[value];
  }

}
