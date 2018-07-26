import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferStatus'
})
export class TransferStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let list = {
  		1: '不转让',
  		2: '转让中',
  		3: '转让成功',
  		4: '租约到期'
  	};
    return list[value];
  }

}
