import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyRight'
})
export class PropertyRightPipe implements PipeTransform {
	// 产权
  	transform(value: any, args?: any): any {
	    let list = {
			1: '大产权',
			2: '小产权'
	  	};
	    return list[value];
  	}

}
