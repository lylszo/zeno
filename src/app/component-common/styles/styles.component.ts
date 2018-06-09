import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {
  list = [
  	{value: 2, name: "苹果"},
  	{value: 2, name: "苹果"},
  	{value: 2, name: "苹果"},
  	{value: 2, name: "苹果"},
  	{value: 2, name: "苹果"},
  	{value: 2, name: "苹果"},
  	{value: 2, name: "苹果"}
  ];
  constructor() { }

  ngOnInit() {
  }

}
