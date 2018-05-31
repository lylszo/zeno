import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {
  //过滤数据，设置四舍五入后最多保留几位小数，默认为两位
  transform(value: any, args?: number): number {
  	if(!+value){
  		return 0;
  	}
  	let rate = Math.pow(10, args || 2);
  	return value ? Math.round(value * rate) / rate : 0;
  }

}
