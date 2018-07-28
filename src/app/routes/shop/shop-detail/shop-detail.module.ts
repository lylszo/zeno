import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { ComponentModule } from '../../../component/component.module';

import { ShopDetailComponent } from './shop-detail.component';

const routes: Routes = [
    { path: '', component: ShopDetailComponent }
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ShopDetailComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ShopDetailModule { }
