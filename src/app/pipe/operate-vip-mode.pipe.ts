import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operateVipMode'
})
export class OperateVipModePipe implements PipeTransform {
  // 会员形式
  transform(value: any, args?: any): any {
    let list = {
	  		1: '会员卡',
			2: '注册会员',
			3: '储值卡'
	  	};
	    return list[value];
  }

}
