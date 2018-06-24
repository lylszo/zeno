import { Component, OnInit } from '@angular/core';
import { RuleService} from '../../service/rule.service';

@Component({
  selector: 'app-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss']
})
export class RuleManageComponent implements OnInit {
  name:string='';

  constructor(public rule:RuleService) {

    this.rule.getDataRules("ALL",'',1,30,(data)=>{
      console.log(data,"ruledata")
    })
  }

  ngOnInit() {
  }

}
