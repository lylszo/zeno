import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {UserService} from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  clicked:boolean=false;
  constructor(public user:UserService,private renderer:Renderer2, public router:Router) {
    this.renderer.addClass(document.body, 'bg');
  }

  loginIn(){
    this.clicked=true;
    let param = {
      mobile:this.account,
      password:this.password
    };
    this.user.login(param,(data)=>{
      console.log("login", data);
      this.router.navigateByUrl('/user')
    })
  }


  ngOnInit() {

  }
  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'bg');
  }

}
