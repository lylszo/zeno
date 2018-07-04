import {Injectable} from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TipPopService {
  errorText:string;
  success:boolean;
  error:object;

  private subject = new Subject<any>();

  constructor() {
  }
  setValue(text, success?:boolean){
    this.errorText = text;
    this.success = success || true;
    this.error = {
      showError:true,
      errorText:this.errorText,
      success:this.success
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
