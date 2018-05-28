import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { UserCenterComponent } from './component/user-center/user-center.component';
import { ShopInfoComponent } from './component/shop-info/shop-info.component';
import { HomeIndexComponent } from './component/home-index/home-index.component';

const homeRoutes: Routes = [
  {
    path: 'home', 
    component: HomeComponent,
    children: [
      { path: '', component: HomeIndexComponent },
      { path: 'userCenter', component: UserCenterComponent },
      { path: 'shopInfo', component: ShopInfoComponent },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [ RouterModule.forChild(homeRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class HomeRoutesModule { }
