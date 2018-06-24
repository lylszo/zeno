import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(public http:HttpService) { }

  getDataRules(targetTable:string,ruleName:string,page:number,pageSize:number,callback:Function){
    let params = {
      targetTable:targetTable,
      ruleName:ruleName,
      page:page,
      pageSize:pageSize

    };
    return this.http.httpGet("dataRules",params,(data) => {
      callback(data)
    })
  }

  addDataRule(description:string,ruleDetails:Array<any>,ruleName:string,targetTable:string,callback:Function){
    let params = {
      description:description,
      ruleDetails:ruleDetails,
      ruleName:ruleName,
      targetTable:targetTable
    };
    return this.http.httpPost("dataRule", params,(data) => {
      callback(data)
    })
  }

  getRuleById(id:string,callback:Function){
    return this.http.httpGet("dataRule/" + id, '',(data) =>{
      callback(data)
    })
  }
}
