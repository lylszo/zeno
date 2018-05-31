import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app.routes';
import { AdminRoutesModule } from './admin.routes';
import { UserRoutesModule } from './user.routes';

import { AppComponent } from './app.component';
import { IndexComponent } from './component-app/index/index.component';
import { LoginComponent } from './component-app/login/login.component';
import { SidebarComponent } from './component-admin/sidebar/sidebar.component';
import { UserManageComponent } from './component-admin/user-manage/user-manage.component';
import { TeamManageComponent } from './component-admin/team-manage/team-manage.component';
import { MemberManageComponent } from './component-admin/member-manage/member-manage.component';
import { RoleManageComponent } from './component-admin/role-manage/role-manage.component';
import { ModuleManageComponent } from './component-admin/module-manage/module-manage.component';
import { DistrictManageComponent } from './component-admin/district-manage/district-manage.component';
import { TagManageComponent } from './component-admin/tag-manage/tag-manage.component';
import { RuleManageComponent } from './component-admin/rule-manage/rule-manage.component';
import { DataSetComponent } from './component-admin/data-set/data-set.component';
import { MyInfoComponent } from './component-admin/my-info/my-info.component';
import { PasswordUpdateComponent } from './component-admin/password-update/password-update.component';
import { DecimalPipe } from './pipe/decimal.pipe';
import { DemoDirective } from './directive/demo.directive';
import { AdminComponent } from './component-admin/admin/admin.component';
import { AdminIndexComponent } from './component-admin/admin-index/admin-index.component';
import { UserComponent } from './component-user/user/user.component';
import { UserIndexComponent } from './component-user/user-index/user-index.component';
import { ToolbarComponent } from './component-admin/toolbar/toolbar.component';
import { NavComponent } from './component-user/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SidebarComponent,
    UserManageComponent,
    TeamManageComponent,
    MemberManageComponent,
    RoleManageComponent,
    ModuleManageComponent,
    DistrictManageComponent,
    TagManageComponent,
    RuleManageComponent,
    DataSetComponent,
    MyInfoComponent,
    PasswordUpdateComponent,
    DecimalPipe,
    DemoDirective,
    AdminComponent,
    AdminIndexComponent,
    UserComponent,
    UserIndexComponent,
    ToolbarComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AdminRoutesModule,
    UserRoutesModule,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
