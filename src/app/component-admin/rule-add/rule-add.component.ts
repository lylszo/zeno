import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-add',
  templateUrl: './rule-add.component.html',
  styleUrls: ['./rule-add.component.scss']
})
export class RuleAddComponent implements OnInit {
  fruitSelect:any;
  constructor() { }

  ngOnInit() {
    this.fruitSelect = [
      {value:1, name:"店铺"},
      {value:2, name: "团队"}
    ]
  }

}
