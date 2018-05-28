import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app.routes';
import { HomeRoutesModule } from './home.routes';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ShopInfoComponent } from './component/shop-info/shop-info.component';
import { UserCenterComponent } from './component/user-center/user-center.component';
import { NavComponent } from './component/nav/nav.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HomeIndexComponent } from './component/home-index/home-index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    LoginComponent,
    ShopInfoComponent,
    UserCenterComponent,
    NavComponent,
    SidebarComponent,
    HomeIndexComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutesModule,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
