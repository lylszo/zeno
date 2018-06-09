import { Component, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  login:any;
  account:string;
  password:string;
  constructor( user:UserService,private renderer:Renderer2) {
    this.renderer.addClass(document.body, 'bg');
  }


  ngOnInit() {

  }

}
