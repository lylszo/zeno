import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './component-user/user/user.component';
import { UserIndexComponent } from './component-user/user-index/user-index.component';
import { ShopServiceComponent } from './component-user/shop-service/shop-service.component';

const userRoutes: Routes = [
  {
    path: 'user', 
    component: UserComponent,
    children: [
      { path: '', component: UserIndexComponent },
      { path: 'userIndex', component: UserIndexComponent },
      { path: 'shopService', component: ShopServiceComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class UserRoutesModule { }
