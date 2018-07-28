import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() userDetail;
  @Input () currentCity;
  @Input () districts;

  constructor() { }

  ngOnInit() {
  }

}
