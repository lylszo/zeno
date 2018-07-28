import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Page} from "./page.model";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  jumpPageNum: number;

  @Input() pageConf: Page;
  @Output() pageChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  pageChange(event: any): void {
    this.pageConf.currentPage = event.page;
    this.pageChanged.emit();
  }

  jumpToPage() {
    this.pageConf.currentPage = this.jumpPageNum;
  }

}
