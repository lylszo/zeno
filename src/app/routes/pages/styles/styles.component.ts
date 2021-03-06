import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {
  value = true;
  radio = true;
  code = 1003;
  zDate: any;

  fruitSelect = [
  	{id: 1001, name: '苹果'},
  	{id: 1002, name: '橙子橙子橙子橙子橙子橙子橙子橙子橙子橙子'},
  	{id: 1003, name: '香蕉'},
  	{id: 1004, name: '梨'},
  	{id: 1005, name: '榴莲'},
  ];

  $checked: boolean = false;

  constructor() { }

  ngOnInit() {
    //选择时间
    laydate.render({
      type: 'datetime',
      elem: '#test2',
      min: '2017-1-1',
      max: new Date().getTime(),
      done: (value) => {
        this.zDate = new Date(value);
      }
    });
  }

}
