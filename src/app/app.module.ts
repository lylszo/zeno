import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app.routes';
import { AdminRoutesModule } from './admin.routes';
import { UserRoutesModule } from './user.routes';
import { PaginationModule , ModalModule} from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CookieService } from 'ngx-cookie-service';

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
import { PreviewimgComponent } from './component-common/previewimg/previewimg.component';
import { ShopServiceComponent } from './component-user/shop-service/shop-service.component';
import { RegisterComponent } from './component-app/register/register.component';
import { ForgetPasswordComponent } from './component-app/forget-password/forget-password.component';
import { AdduserComponent } from './component-admin/user-manage/adduser/adduser.component';
import { StylesComponent } from './component-common/styles/styles.component';
import { SelectComponent } from './component-common/select/select.component';
import { UserDataSetComponent } from './component-user/user-data-set/user-data-set.component';
import { ChangePhoneComponent } from './component-user/change-phone/change-phone.component';
import { ChooseCityComponent } from './component-common/choose-city/choose-city.component';
import { HistoryLogComponent } from './component-user/history-log/history-log.component';
import { ChangePwdComponent } from './component-user/change-pwd/change-pwd.component';
import { NewsComponent } from './component-user/news/news.component';
import { SetCategoryComponent } from './component-user/release-store/set-category/set-category.component';
import { FillInformComponent } from './component-user/release-store/fill-inform/fill-inform.component';
import { ReleaseOkComponent } from './component-user/release-store/release-ok/release-ok.component';
import { AddTeamComponent } from './component-admin/team-manage/add-team/add-team.component';
import { ShopDetailComponent } from './component-user/shop-detail/shop-detail.component';
import { ShopEditComponent } from './component-user/shop-edit/shop-edit.component';
import { RuleAddComponent } from './component-admin/rule-add/rule-add.component';
import { SetRelatedTagsComponent } from './component-admin/set-related-tags/set-related-tags.component';

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
    PreviewimgComponent,
    ShopServiceComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    AdduserComponent,
    StylesComponent,
    UserDataSetComponent,
    SelectComponent,
    ChangePhoneComponent,
    ChooseCityComponent,
    HistoryLogComponent,
    ChangePwdComponent,
    NewsComponent,
    SetCategoryComponent,
    FillInformComponent,
    ReleaseOkComponent,
    AddTeamComponent,
    ShopDetailComponent,
    ShopEditComponent,
    RuleAddComponent,
    SetRelatedTagsComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutesModule,
    UserRoutesModule,
    AppRoutesModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
