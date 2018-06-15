import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() list: any[];//下拉选项数组，其中被选中的那项selected为true,如果没有任何一项的selected为true，则默认为第一项
  @Input() width: number;//控制下拉框宽度，默认为180（px）
  @Input() selectedItem: any;//选中项的值
  @Input() selectedCode: number;//选中项的code值

  @Output() selectedItemChange = new EventEmitter();
  @Output() selectedCodeChange = new EventEmitter();

  showContent: boolean = false;//控制下拉选项是否显示 
  text: string = '';

  constructor() { }

  ngOnInit() {
  	let selectedArr = this.list.filter(function(v){
  		return v.selected;
  	})
  	if(selectedArr.length){
  		this.text = selectedArr[0].name;
  		this.selectedItem = selectedArr[0];
  	}else{
  		if(this.list[0]){
  			this.list[0].selected = true;
  			this.text = this.list[0].name;
        this.selectedItem = this.list[0];
  			this.selectedCode = this.list[0].code;
  		}
  	}
  	//发射初始项目数据
    this.selectedItemChange.emit(this.selectedItem);
  	this.selectedCodeChange.emit(this.selectedCode);
  }

  choose(item) {
  	this.showContent = false;
  	this.text = item.name;
  	this.list.forEach(function(v){
  		v.selected = false;
  	})
  	item.selected = true;
    this.selectedItem = item;
  	this.selectedCode = item.code;

  	//发射改变的项目数据
  	this.selectedItemChange.emit(this.selectedItem);
    this.selectedCodeChange.emit(this.selectedCode);
  }

}
