import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nearStreet'
})
export class NearStreetPipe implements PipeTransform {
	//是否临街
  	transform(value: any, args?: any): any {
	    let list = {
			1: '全部',
			2: '临街',
			3: '不临街'
	  	};
	    return list[value];
  	}

}
