import {  Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter,Output  } from '@angular/core';

@Component({
  selector: 'app-select-team-type',
  templateUrl: './select-team-type.component.html',
  styleUrls: ['./select-team-type.component.scss']
})
export class SelectTeamTypeComponent implements OnInit {
  types:Array<any> = [];
  selectedTeamType:Array<any>;

  constructor() { }
  @Input() showPanel:boolean;
  @Input()
  get selectedType(){
    return this.selectedTeamType;
  }
  set selectedType(val){
    this.selectedTeamType = val;
    this.typeChange.emit(this.selectedTeamType)
  }
  @Output() typeChange: EventEmitter<any> = new EventEmitter();

  changeChecked(item){
    item.checked = !item.checked;
    if(item.checked===true){
      this.selectedTeamType.push(item)
    }else{
      this.selectedTeamType.splice(this.selectedTeamType.indexOf(item),1)
    }
  }

  ngOnInit() {
    this.types = [{value:1,name:"全部",checked:false},{value:2,name:"自营",checked:false},
      {value:3,name:"加盟商",checked:false}]
  }

}
