import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { enableProdMode } from '@angular/core';
enableProdMode();

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() list: any[];//下拉选项数组, 注意必须使用code属性表示选项代号，name属性表示选项名称
  @Input() width: number;//控制下拉框宽度，默认为180（px）
  @Input() codeName: string = 'code';//选项对象的数字代码的属性，默认是code，可通过改属性改为'id'等名称
  @Input() selectedItem: any;//选中项的值,如需获取选中项除code外其他值，可以使用该属性，否则不需要绑定该属性
  @Input() selectedCode: number;//选中项的code值,可设置默认项，如果没有设置，则默认为第一项

  @Output() selectedItemChange = new EventEmitter();
  @Output() selectedCodeChange = new EventEmitter();
  @Output() onChange = new EventEmitter();//当选中的值变化的时候执行的函数

  showContent: boolean = false;//控制下拉选项是否显示
  text: string = '';
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initData();
    this.change();
    if(changes.selectedItem || changes.selectedCode) {
      this.onChange.emit(); 
    }
  }

  //设置默认值
  initData() {
    if(!this.list || !this.list.length) {
      return;
    }
    if(this.selectedCode){
      this.list.forEach(v => {
        if(v[this.codeName] == this.selectedCode){
          v.selected = true;
          this.text = v.name;
          this.selectedItem = v;
          this.selectedCode = v[this.codeName];
        }
      })
    }else {
      if(this.list && this.list.length){
        this.list[0].selected = true;
        this.text = this.list[0].name;
        this.selectedItem = this.list[0];
        this.selectedCode = this.list[0][this.codeName];         
      }
    }
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
  	this.selectedCode = item[this.codeName];
    this.change();
  }
  
  //数据变化的时候执行的函数
  change() {
    this.selectedItemChange.emit(this.selectedItem);
    this.selectedCodeChange.emit(this.selectedCode);
  }

}