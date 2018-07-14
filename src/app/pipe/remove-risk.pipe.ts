import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeRisk'
})
export class RemoveRiskPipe implements PipeTransform {
	// 拆迁风险
  	transform(value: any, args?: any): any {
	    let list = {
	  		1: '有',
	  		2: '无'
	  	};
	    return list[value];
  	}

}
