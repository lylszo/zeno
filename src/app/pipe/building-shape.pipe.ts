import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildingShape'
})
export class BuildingShapePipe implements PipeTransform {
  //建筑形状
  transform(value: any, args?: any): any {
    let list = {
  		1: '正方形',
  		2: '长方形',
  		3: '不规则形',
  		4: '厂棚'
  	};
    return list[value];
  }

}
