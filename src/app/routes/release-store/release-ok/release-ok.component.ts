import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-ok',
  templateUrl: './release-ok.component.html',
  styleUrls: ['./release-ok.component.scss']
})
export class ReleaseOkComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  //店铺id
  id = this.route.snapshot.params.id;

}
