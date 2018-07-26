import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decorateGrade'
})
export class DecorateGradePipe implements PipeTransform {
// 装修档次
  transform(value: any, args?: any): any {
    let list = {
  		1: '毛坯',
  		2: '简装',
  		3: '精装',
  		4: '豪华'
  	};
    return list[value];
  }

}
