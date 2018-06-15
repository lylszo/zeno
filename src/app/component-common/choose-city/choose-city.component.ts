import {Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter,Output} from '@angular/core';
import { DistrictService } from '../../service/district.service';

@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.scss']
})
export class ChooseCityComponent implements OnInit, OnChanges {

  districtData:any;
  citys = [];
  // _showCityPanel:boolean;

  constructor() {

  }
  @Input() showCityPanel:boolean;
  @Output() event: EventEmitter<any> = new EventEmitter();


  ngOnChanges(changes: SimpleChanges):void{
    let change = changes.showCityPanel;
    this.showCityPanel = change.currentValue;
  }

  getCity(item){
    this.event.emit(item);
  }

  ngOnInit() {
    this.districtData = JSON.parse(localStorage.getItem("district"));
    let len = this.districtData.length;
    for(let i=0;i<len;i++){
      if(this.districtData[i].code.toString().length===2){
        this.citys.push(this.districtData[i]);
      }
    }
    console.log(this.citys,"citys");
  }

}
