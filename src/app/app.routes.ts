import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './component-app/index/index.component';
import { LoginComponent } from './component-app/login/login.component';
import { StylesComponent } from './component-common/styles/styles.component';
import { RegisterComponent } from './component-app/register/register.component';
import { ForgetPasswordComponent } from './component-app/forget-password/forget-password.component';

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'styles', component: StylesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutesModule { }
