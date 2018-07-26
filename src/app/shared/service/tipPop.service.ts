import {Injectable} from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TipPopService {
  errorText:string;
  fail:boolean;
  error:object;

  private subject = new Subject<any>();

  constructor() {
  }
  setValue(text, fail?:boolean){
    this.errorText = text;
    this.fail = fail || false;
    this.error = {
      showError:true,
      errorText:this.errorText,
      fail:this.fail
    };
    this.subject.next(this.error);
  }
  getValue() {
    return this.subject.asObservable();
  }
  clearValue() {
    this.subject.next();
  }
}
