import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ComponentModule } from '../../component/component.module';

import { DistrictManageComponent } from './district-manage/district-manage.component';
import { ModuleManageComponent } from './module-manage/module-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';
import { TagManageComponent } from './tag-manage/tag-manage.component';
import { RuleAddComponent } from './rule-add/rule-add.component';

const routes: Routes = [
    { path: 'district', component: DistrictManageComponent },
    { path: 'module', component: ModuleManageComponent },
    { path: 'role', component: RoleManageComponent },
    { path: 'rule', component: RuleManageComponent },
    { path: 'tag', component: TagManageComponent },
    { path: 'addRule', component: RuleAddComponent },
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DistrictManageComponent,
        ModuleManageComponent,
        RoleManageComponent,
        RuleManageComponent,
        TagManageComponent,
        RuleAddComponent
    ],
    exports: [
        RouterModule,
        DistrictManageComponent,
        ModuleManageComponent,
        RoleManageComponent,
        RuleManageComponent,
        TagManageComponent,
        RuleAddComponent
    ]
})
export class SystemManageModule { }
