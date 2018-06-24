import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() list: any[];//下拉选项数组, 注意必须使用code属性表示选项代号，name属性表示选项名称
  @Input() width: number;//控制下拉框宽度，默认为180（px）
  @Input() selectedItem: any;//选中项的值,如需获取选中项除code外其他值，可以使用该属性，否则不需要绑定该属性
  @Input() selectedCode: number;//选中项的code值,可设置默认项，如果没有设置，则默认为第一项

  @Output() selectedItemChange = new EventEmitter();
  @Output() selectedCodeChange = new EventEmitter();

  showContent: boolean = false;//控制下拉选项是否显示
  text: string = '';

  constructor() { }

  ngOnInit() {
    this.initData();
  }

  ngOnChanges() {
    this.initData();
  }

  //设置默认值
  initData() {
    if(this.selectedCode){
      this.list.forEach(v => {
        if(v.code == this.selectedCode){
          v.selected = true;
          this.text = v.name;
          this.selectedItem = v;
          this.selectedCode = v.code;
        }
      })
    }else {
      if(this.list && this.list.length){
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

  //选择项目
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