import { Component, OnInit } from '@angular/core';
import { TipPopService} from '../../../service/tipPop.service';

@Component({
  selector: 'app-set-category',
  templateUrl: './set-category.component.html',
  styleUrls: ['./set-category.component.scss']
})
export class SetCategoryComponent implements OnInit {

  choosed: string;

  constructor(private tip: TipPopService) {
    this.choosed = '店铺';
  }

  ngOnInit() {
  }

  choose(str: string) {
    if(str == '业主') {
      this.tip.setValue('暂时不能发布业务信息哦, 敬请期待', true);
      return;
    }
    this.choosed = str;
  }

}
