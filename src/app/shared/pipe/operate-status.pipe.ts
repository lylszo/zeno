import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operateStatus'
})
export class OperateStatusPipe implements PipeTransform {
	// 经营状态
  	transform(value: any, args?: any): any {
	    let list = {
	  		1: '经营中',
	  		2: '停业',
	  		3: '装修'
	  	};
	    return list[value];
  	}

}
