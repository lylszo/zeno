import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app.routes';
import { AdminRoutesModule } from './admin.routes';
import { UserRoutesModule } from './user.routes';
import { PaginationModule , ModalModule} from 'ngx-bootstrap';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { NgProgressRouterModule } from "@ngx-progressbar/router";
import { HashLocationStrategy , LocationStrategy } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { TipPopService } from './service/tipPop.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './component-app/index/index.component';
import { LoginComponent } from './component-app/login/login.component';
import { UserManageComponent } from './component-admin/user-manage/user-manage.component';
import { TeamManageComponent } from './component-admin/team-manage/team-manage.component';
import { MemberManageComponent } from './component-admin/member-manage/member-manage.component';
import { RoleManageComponent } from './component-admin/role-manage/role-manage.component';
import { ModuleManageComponent } from './component-admin/module-manage/module-manage.component';
import { DistrictManageComponent } from './component-admin/district-manage/district-manage.component';
import { TagManageComponent } from './component-admin/tag-manage/tag-manage.component';
import { RuleManageComponent } from './component-admin/rule-manage/rule-manage.component';
import { DataSetComponent } from './component-common/user-center/data-set/data-set.component';
import { MyInfoComponent } from './component-admin/my-info/my-info.component';
import { DecimalPipe } from './pipe/decimal.pipe';
import { DemoDirective } from './directive/demo.directive';
import { AdminComponent } from './component-admin/admin/admin.component';
import { AdminIndexComponent } from './component-admin/admin-index/admin-index.component';
import { UserComponent } from './component-user/user/user.component';
import { UserIndexComponent } from './component-user/user-index/user-index.component';
import { PreviewimgComponent } from './component-common/previewimg/previewimg.component';
import { ShopServiceComponent } from './component-user/shop-service/shop-service.component';
import { RegisterComponent } from './component-app/register/register.component';
import { ForgetPasswordComponent } from './component-app/forget-password/forget-password.component';
import { AdduserComponent } from './component-admin/user-manage/adduser/adduser.component';
import { StylesComponent } from './component-common/styles/styles.component';
import { ChangePhoneComponent } from './component-common/user-center/change-phone/change-phone.component';
import { ChooseCityComponent } from './component-common/choose-city/choose-city.component';
import { HistoryLogComponent } from './component-user/history-log/history-log.component';
import { ChangePwdComponent } from './component-common/user-center/change-pwd/change-pwd.component';
import { NewsComponent } from './component-common/user-center/news/news.component';
import { NewsDetailComponent } from "./component-common/user-center/news/newsDetail.component";
import { SetCategoryComponent } from './component-user/release-store/set-category/set-category.component';
import { FillInformComponent } from './component-user/release-store/fill-inform/fill-inform.component';
import { ReleaseOkComponent } from './component-user/release-store/release-ok/release-ok.component';
import { AddTeamComponent } from './component-admin/team-manage/add-team/add-team.component';
import { ShopDetailComponent } from './component-user/shop-detail/shop-detail.component';
import { ShopEditComponent } from './component-user/shop-edit/shop-edit.component';
import { RuleAddComponent } from './component-admin/rule-add/rule-add.component';
import { SetRelatedTagsComponent } from './component-admin/set-related-tags/set-related-tags.component';
import { MapComponent } from './component-common/map/map.component';
import { MapModalComponent } from './component-common/map-modal/map-modal.component';
import { SelectCityMultiComponent } from './component-common/select-city-multi/select-city-multi.component';
import { SelectTeamTypeComponent } from './component-common/select-team-type/select-team-type.component';
import { PaginationComponent } from './component-common/pagination/pagination.component';
import { DistrictComponent } from './component-common/district/disctrict/district.component';
import { DistrictMultComponent } from './component-common/district/district-mult/district-mult.component';
import { CityNamePipe } from './pipe/city-name.pipe';
import { RoleModalComponent } from './component-common/role-modal/role-modal.component';
import {Guard} from "./service/guard.service";
import { ChooseIndustryComponent } from './component-common/choose-industry/choose-industry.component';
import { ChooseDistrictComponent } from './component-common/choose-district/choose-district.component';
import { ParentPropertyPipe } from './pipe/parent-property.pipe';
import { PositionDescPipe } from './pipe/position-desc.pipe';
import { IndustryNamePipe } from './pipe/industry-name.pipe';
import { RentUnitPipe } from './pipe/rent-unit.pipe';
import { OperateStatusPipe } from './pipe/operate-status.pipe';
import { NearStreetPipe } from './pipe/near-street.pipe';
import { TransferCanEmptyPipe } from './pipe/transfer-can-empty.pipe';
import { BuildingShapePipe } from './pipe/building-shape.pipe';
import { PropertyRightPipe } from './pipe/property-right.pipe';
import { RemoveRiskPipe } from './pipe/remove-risk.pipe';
import { OperateModePipe } from './pipe/operate-mode.pipe';
import { DecorateGradePipe } from './pipe/decorate-grade.pipe';
import { OperateVipModePipe } from './pipe/operate-vip-mode.pipe';
import { TransferStatusPipe } from './pipe/transfer-status.pipe';
import { CertificateTypePipe } from './pipe/certificate-type.pipe';
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
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
    DecimalPipe,
    DemoDirective,
    AdminComponent,
    AdminIndexComponent,
    UserComponent,
    UserIndexComponent,
    PreviewimgComponent,
    ShopServiceComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    AdduserComponent,
    StylesComponent,
    ChangePhoneComponent,
    ChooseCityComponent,
    HistoryLogComponent,
    ChangePwdComponent,
    NewsComponent,
    NewsDetailComponent,
    SetCategoryComponent,
    FillInformComponent,
    ReleaseOkComponent,
    AddTeamComponent,
    ShopDetailComponent,
    ShopEditComponent,
    RuleAddComponent,
    SetRelatedTagsComponent,
    MapComponent,
    MapModalComponent,
    SelectCityMultiComponent,
    SelectTeamTypeComponent,
    PaginationComponent,
    DistrictComponent,
    DistrictMultComponent,
    CityNamePipe,
    RoleModalComponent,
    ChooseIndustryComponent,
    ChooseDistrictComponent,
    ParentPropertyPipe,
    PositionDescPipe,
    IndustryNamePipe,
    RentUnitPipe,
    OperateStatusPipe,
    NearStreetPipe,
    TransferCanEmptyPipe,
    BuildingShapePipe,
    PropertyRightPipe,
    RemoveRiskPipe,
    OperateModePipe,
    DecorateGradePipe,
    OperateVipModePipe,
    TransferStatusPipe,
    CertificateTypePipe
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
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule
  ],
  providers: [CookieService, TipPopService, {provide: LocationStrategy, useClass: HashLocationStrategy}, Guard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
