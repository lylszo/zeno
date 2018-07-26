import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'certificateType'
})
export class CertificateTypePipe implements PipeTransform {
	//证件类型
  	transform(value: any, args?: any): any {
	    let list = {
			1: '营业执照',
			2: '税务登记证',
			3: '组织机构代码证',
			4: '卫生许可证',
			5: '公共场所安全许可证',
			6: '餐饮服务许可证',
			7: '食品流通许可证',
			8: '酒类批发许可证',
			0: '其他'
	  	};
	    return list[value];
  	}

}
