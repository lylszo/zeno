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

  fruitSelect = [
  	{code: 1001, name: '苹果'},
  	{code: 1002, name: '橙子橙子橙子橙子橙子橙子橙子橙子橙子橙子'},
  	{code: 1003, name: '香蕉'},
  	{code: 1004, name: '梨'},
  	{code: 1005, name: '榴莲'},
  ];

  $checked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
