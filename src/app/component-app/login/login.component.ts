import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {UserService} from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit, OnDestroy {

  login:any;
  account:string;
  password:string;
  constructor( user:UserService,private renderer:Renderer2) {
    this.renderer.addClass(document.body, 'bg');
  }


  ngOnInit() {

  }
  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'bg');
  }

}
