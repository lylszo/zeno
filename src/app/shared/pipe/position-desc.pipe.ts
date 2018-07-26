import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionDesc'
})
export class PositionDescPipe implements PipeTransform {
	// 方位
  	transform(value: any, args?: any): any {
	    let list = {
			1: '街道转角',
			2: '街道路口',
			3: '街道中心',
			4: '交叉路口',
			5: '社区内',
			6: '小区底商',
			7: '商场楼层'
	  	};
	    return list[value];
  	}

}
