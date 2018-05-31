import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './component-user/user/user.component';
import { UserIndexComponent } from './component-user/user-index/user-index.component';

const userRoutes: Routes = [
  {
    path: 'user', 
    component: UserComponent,
    children: [
      { path: '', component: UserIndexComponent },
      { path: 'userIndex', component: UserIndexComponent },
      { path: '**', redirectTo: '/user', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class UserRoutesModule { }
