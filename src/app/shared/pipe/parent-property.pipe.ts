import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentProperty'
})
export class ParentPropertyPipe implements PipeTransform {
	// 上级物业分类
  	transform(value: any, args?: any): any {
	  	let list = {
	  		1: '商铺',
			2: '社区',
			3: '商场',
			4: '写字楼',
			5: '医院',
			6: '景区',
			7: '游乐园',
			8: '公园',
			9: '学校',
			10: '美食城',
			11: '汽车站',
			12: '火车站'
	  	};
	    return list[value];
  	}

}
