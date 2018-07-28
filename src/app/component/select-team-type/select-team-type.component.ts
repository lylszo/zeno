import {  Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter,Output  } from '@angular/core';

@Component({
  selector: 'app-select-team-type',
  templateUrl: './select-team-type.component.html',
  styleUrls: ['./select-team-type.component.scss']
})
export class SelectTeamTypeComponent implements OnInit {
  types:Array<any> = [];
  selectedTeamType:Array<any>;
  showPanel:boolean = false;

  constructor() { }
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
  hideModal(){
    this.showPanel = !this.showPanel;
  }
  showPanelOr(){
    this.showPanel = !this.showPanel
  }
  delete(item){
    this.selectedTeamType.splice(this.selectedTeamType.indexOf(item),1);
    item.checked = false
  }

  ngOnInit() {
    this.types = [{value:"0",name:"全部",checked:false},{value:"1",name:"自营",checked:false},
      {value:"2",name:"加盟商",checked:false}];
  }

}
