import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'industryName'
})
export class IndustryNamePipe implements PipeTransform {
	//大小行业
	transform(value: any, args?: any): any {
		let list = JSON.parse(localStorage.getItem('industry'));
		let newObj = {};
		list.forEach(v => {
			newObj[v.code] = v.name;
			if(v.child && v.child.length) {
				v.child.forEach(w => {
					newObj[w.code] = w.name;
				})
			}
		})
		return newObj[value];
	}

}
