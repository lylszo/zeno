import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ComponentModule } from '../../component/component.module';

import { UserManageComponent } from './user-manage/user-manage.component';
import { AdduserComponent } from './user-manage/adduser/adduser.component';

const routes: Routes = [
    { path: 'userManage', component: UserManageComponent },
    { path: 'addUser', component: AdduserComponent },
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        UserManageComponent,
        AdduserComponent
    ],
    exports: [
        RouterModule,
        UserManageComponent,
        AdduserComponent
    ]
})
export class UserManageModule { }
