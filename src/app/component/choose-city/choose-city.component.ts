import {Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter,Output} from '@angular/core';
import { HttpService } from "../../shared/service/http.service";

@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.scss']
})
export class ChooseCityComponent implements OnInit, OnChanges {

  districtData:any;
  provinces:Array<any>=[];
  citys:Array<any> = [];
  // _showCityPanel:boolean;

  constructor(private http:HttpService) {

  }
  @Input() showCityPanel:boolean;
  @Output() event: EventEmitter<any> = new EventEmitter();


  ngOnChanges(changes: SimpleChanges):void{
    let change = changes.showCityPanel;
    this.showCityPanel = change.currentValue;
  }
  getCity(item){
    this.citys = [];
    this.http._get("district", {parent_id: item.code}, (data) => {
      this.citys = data;
    });
  }

  chooseCity(item){
    this.event.emit(item);
  }

  ngOnInit() {
    // this.districtData = JSON.parse(localStorage.getItem("district"));
    // let len = this.districtData.length;
    // for(let i=0;i<len;i++){
    //   if(this.districtData[i].code.toString().length===4){
    //     this.citys.push(this.districtData[i]);
    //   }
    // }
    this.http._get("district", {parent_id: '0'}, (data) => {
      this.provinces = data;
    });
  }
}
