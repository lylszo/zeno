import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ComponentModule } from '../../component/component.module';

import { TeamManageComponent } from './team-manage/team-manage.component';
import { MemberManageComponent } from './member-manage/member-manage.component';
import { AddTeamComponent } from './team-manage/add-team/add-team.component';

const routes: Routes = [
    { path: 'teamManage', component: TeamManageComponent },
    { path: 'add', component: AddTeamComponent },
    { path: 'member/:teamId/:teamName', component: MemberManageComponent }
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AddTeamComponent,
        TeamManageComponent,
        MemberManageComponent
    ],
    exports: [
        RouterModule,
        AddTeamComponent,
        TeamManageComponent,
        MemberManageComponent
    ]
})
export class TeamManageModule { }
