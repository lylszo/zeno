import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";

@Component({
	selector: 'app-date-time',
	templateUrl: './date-time.component.html',
	styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

	defaultTime = new Date();

	//所选时间
	time;
	//列表数据
	data;

	constructor(private datePipe: DatePipe) { }

	ngOnInit() {
		this.data = [{
				text: '时',
				list: this.getArr(0, 23)
			},{
				text: '分',
				list: this.getArr(0, 59)
			}
		];
		if(this.defaultTime){
			this.time = this.datePipe.transform(this.defaultTime, "yyyy-MM-dd HH:mm:ss").slice(11, 16);
		}
	}


	//按照最大最小值生成数组
	getArr(min, max) {
		let arr = [];
		for(let i = min; i <= max; i++){
			let item = i < 10 ? '0' + i : '' + i;
			arr.push(item);
		}
		return arr;
	}

}
