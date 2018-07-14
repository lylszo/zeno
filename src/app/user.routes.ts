import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './component-user/user/user.component';
import {UserIndexComponent} from './component-user/user-index/user-index.component';
import {ShopServiceComponent} from './component-user/shop-service/shop-service.component';
import {ShopDetailComponent} from './component-user/shop-detail/shop-detail.component';
import {ShopEditComponent} from './component-user/shop-edit/shop-edit.component';
import {ChangePhoneComponent} from "./component-common/user-center/change-phone/change-phone.component";
import {HistoryLogComponent} from "./component-user/history-log/history-log.component";
import {SetCategoryComponent} from "./component-user/release-store/set-category/set-category.component";
import {FillInformComponent} from "./component-user/release-store/fill-inform/fill-inform.component";
import {ReleaseOkComponent} from "./component-user/release-store/release-ok/release-ok.component";
import {DataSetComponent} from "./component-common/user-center/data-set/data-set.component";
import {ChangePwdComponent} from "./component-common/user-center/change-pwd/change-pwd.component";
import {NewsComponent} from "./component-common/user-center/news/news.component";
import {NewsDetailComponent} from "./component-common/user-center/news/newsDetail.component";

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {path: '', component: UserIndexComponent},
      {path: 'userIndex', component: UserIndexComponent},
      {path: 'shopService', component: ShopServiceComponent},
      {path: 'shopDetail/:id', component: ShopDetailComponent},
      {path: 'shopEdit/:id', component: ShopEditComponent},
      {path: 'dataSet', component: DataSetComponent},
      {path: 'changePhone', component: ChangePhoneComponent},
      {path: 'changePwd', component: ChangePwdComponent},
      {path: 'historyLog', component: HistoryLogComponent},
      {path: 'news', component: NewsComponent},
      {path: 'newsDetail/:id', component: NewsDetailComponent},
      {path: 'releaseStore', component: SetCategoryComponent},
      {path: 'fillInform', component: FillInformComponent},
      {path: 'releaseOk/:id', component: ReleaseOkComponent},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class UserRoutesModule {
}
