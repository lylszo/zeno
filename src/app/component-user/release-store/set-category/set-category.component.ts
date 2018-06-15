import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-category',
  templateUrl: './set-category.component.html',
  styleUrls: ['./set-category.component.scss']
})
export class SetCategoryComponent implements OnInit {

  choosed: string;

  constructor() {
    this.choosed = '店铺';
  }

  ngOnInit() {
  }

  choose(str: string) {
    this.choosed = str;
  }

}
