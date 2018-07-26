import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operateMode'
})
export class OperateModePipe implements PipeTransform {
  //运营模式
  transform(value: any, args?: any): any {
    let list = {
  		1: '连锁',
  		2: '直营',
  		3: '代理',
  		4: '经销',
  		5: '特许',
  		6: '其他',
  	};
    return list[value];
  }

}
