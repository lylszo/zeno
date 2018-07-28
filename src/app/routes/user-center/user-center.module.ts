import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ComponentModule } from '../../component/component.module';

import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { DataSetComponent } from './data-set/data-set.component';
import { HistoryLogComponent } from './history-log/history-log.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news/newsDetail.component';

const routes: Routes = [
    { path: 'changePhone', component: ChangePhoneComponent },
    { path: 'changePwd', component: ChangePwdComponent },
    { path: 'dataSet', component: DataSetComponent },
    { path: 'historyLog', component: HistoryLogComponent },
    { path: 'news', component: NewsComponent },
    { path: 'newsDetail/:id', component: NewsDetailComponent },
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ChangePhoneComponent,
        ChangePwdComponent,
        DataSetComponent,
        HistoryLogComponent,
        NewsComponent,
        NewsDetailComponent
    ],
    exports: [
        RouterModule,
        ChangePhoneComponent,
        ChangePwdComponent,
        DataSetComponent,
        HistoryLogComponent,
        NewsComponent,
        NewsDetailComponent
    ]
})
export class UserCenterModule { }
