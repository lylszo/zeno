import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ComponentModule } from '../../component/component.module';

import { FillInformComponent } from './release-store/fill-inform/fill-inform.component';
import { ReleaseOkComponent } from './release-store/release-ok/release-ok.component';
import { SetCategoryComponent } from './release-store/set-category/set-category.component';

const routes: Routes = [
    { path: 'post', component: FillInformComponent },
    { path: 'ok', component: ReleaseOkComponent },
    { path: 'category', component: SetCategoryComponent },
    { path: 'list', loadChildren: './shop-service/shop-service.module#ShopServiceModule' },
    { path: 'detail/:id', loadChildren: './shop-detail/shop-detail.module#ShopDetailModule' },
    { path: 'edit/:id', loadChildren: './shop-edit/shop-edit.module#ShopEditModule' }
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FillInformComponent,
        ReleaseOkComponent,
        SetCategoryComponent
    ],
    exports: [
        RouterModule,
        FillInformComponent,
        ReleaseOkComponent,
        SetCategoryComponent
    ]
})
export class ShopModule { }
