import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TipPopService } from '../../service/tipPop.service';

@Component({
  selector: 'app-choose-industry',
  templateUrl: './choose-industry.component.html',
  styleUrls: ['./choose-industry.component.scss']
})
export class ChooseIndustryComponent implements OnInit, OnChanges {
 
  //是否显示选择框
  show: boolean = false;
  //列表
  list = JSON.parse(localStorage.getItem('industry')) || [];
  //已选行业数
  num = 0;

  @Input() selectedList = [];//已选行业
  @Input() max = 1;//最多选择几个行业，默认为1
  @Input() defaultCodes;//默认行业code列表
  @Input() chooseBig = true;//选择大行业，默认可选，可传false限制选择大行业

  @Output() selectedListChange = new EventEmitter();

  constructor(private tip: TipPopService) { }

  ngOnInit() {
  	
  }

  ngOnChanges(changes: SimpleChanges) {
  	if(changes.defaultCodes && changes.defaultCodes.currentValue){
  		let codeArr = changes.defaultCodes.currentValue;
  		let arr = [];
  		this.list.forEach(v => {
  			codeArr.forEach(w => {
  				if(v.code == w){
  					arr.push(v);
  				}
  			})
  			if(v.child){
  				v.child.forEach(i => {
  					codeArr.forEach(j => {
		  				if(i.code == j){
		  					arr.push(i);
		  				}
		  			})
  				})
  			}
  		})
  		this.selectedList = arr;
		this.selectedListChange.emit(arr);
  	}
  }

  //点击添加行业
  showBox() {
  	this.selectedList = this.selectedList || [];
  	this.list.forEach(v => {
  		v.selected = false;
  		this.selectedList.forEach(w => {
  			if(w.code == v.code) {
  				v.selected = true;
  			}
  		})
  		if(v.child) {
  			v.child.forEach(i => {
  				i.selected = false;
  				this.selectedList.forEach(j => {
		  			if(j.code == i.code) {
		  				i.selected = true;
		  			}
		  		})
  			})
  		}
  	})
  	this.show = true;
  	this.num = this.selectedList.length;
  }

  //选择行业
  choose(item) {
  	if(item.child && !this.chooseBig) {
		this.tip.setValue(`不能选择大行业！`);
		return;
  	}
	if(this.num >= this.max && !item.selected){
		let txt = `最多可以选择${this.max}个行业！`;
		this.tip.setValue(txt);
		return;
	}
  	item.selected = !item.selected;
  	if(item.child) {
  		item.child.forEach(v => {
  			v.selected = false;
  		})
  	}else {
  		let id = item.code.toString().slice(0, 2);
  		this.list.forEach(v => {
  			if(id == v.code) {
  				v.selected = false;
  			}
  		})
  	}
  	let num = 0;
	this.list.forEach(v => {
		if(v.selected){
			num++; 
		}
		if(v.child){
			v.child.forEach(w => {
				if(w.selected){
					num++;
				}
			})
		}
	})
	this.num = num;
  }

  //确定选择
  submit() {
  	this.selectedList = [];
  	this.list.forEach(v => {
		if(v.selected) {
			this.selectedList.push(v);
		}else if(v.child){
			v.child.forEach(w => {
				if(w.selected){
					this.selectedList.push(w);
				}
			})
		}
	})
	this.show = false;
	this.selectedListChange.emit(this.selectedList);
  }

  //删除行业
  del(code) {
  	this.selectedList.forEach((v, i , a) => {
  		if(v.code == code) {
  			a.splice(i, 1);
  		}
  	})
  }
}
