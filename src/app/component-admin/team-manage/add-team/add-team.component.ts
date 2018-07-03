import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  teamType = [{
    code: 0,
    name: '-请选择-'
  }, {
    code: 1,
    name: '自营'
  }, {
    code: 2,
    name: '加盟店'
  }];

  constructor() { }

  ngOnInit() {
  }

  back() {
    history.back();
  }

}
