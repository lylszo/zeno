import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './component-admin/admin/admin.component';
import { AdminIndexComponent } from './component-admin/admin-index/admin-index.component';
import { UserManageComponent } from './component-admin/user-manage/user-manage.component';
import { TeamManageComponent } from './component-admin/team-manage/team-manage.component';
import { MemberManageComponent } from './component-admin/member-manage/member-manage.component';
import { RoleManageComponent } from './component-admin/role-manage/role-manage.component';
import { ModuleManageComponent } from './component-admin/module-manage/module-manage.component';
import { DistrictManageComponent } from './component-admin/district-manage/district-manage.component';
import { TagManageComponent } from './component-admin/tag-manage/tag-manage.component';
import { RuleManageComponent } from './component-admin/rule-manage/rule-manage.component';
import { DataSetComponent } from './component-admin/data-set/data-set.component';
import { PasswordUpdateComponent } from './component-admin/password-update/password-update.component';
import { MyInfoComponent } from './component-admin/my-info/my-info.component';
import { AdduserComponent} from "./component-admin/user-manage/adduser/adduser.component";
import { NewsComponent } from "./component-user/news/news.component";
import { AddTeamComponent } from "./component-admin/team-manage/add-team/add-team.component";
import { RuleAddComponent } from './component-admin/rule-add/rule-add.component';
import { Guard } from "./service/guard.service";


const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [Guard],
    children: [
      { path: '', component: AdminIndexComponent },
      { path: 'userManage', component: UserManageComponent },
      { path: 'teamManage', component: TeamManageComponent },
      { path: 'memberManage', component: MemberManageComponent },
      { path: 'roleManage', component: RoleManageComponent },
      { path: 'moduleManage', component: ModuleManageComponent },
      { path: 'districtManage', component: DistrictManageComponent },
      { path: 'tagManage', component: TagManageComponent },
      { path: 'ruleManage', component: RuleManageComponent },
      { path: 'dataSet', component: DataSetComponent },
      { path: 'passwordUpdate', component: PasswordUpdateComponent },
      { path: 'myInfo', component: MyInfoComponent },
      { path: 'adduser', component: AdduserComponent},
      { path: 'addTeam', component: AddTeamComponent},
      { path: 'addRule', component: RuleAddComponent},
      { path: 'news', component: NewsComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AdminRoutesModule { }
