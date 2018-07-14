import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferCanEmpty'
})
export class TransferCanEmptyPipe implements PipeTransform {
	// 可否空转
  	transform(value: any, args?: any): any {
	    let list = {
			1: '可空转',
			2: '不可空转'
	  	};
	    return list[value];
  	}

}
