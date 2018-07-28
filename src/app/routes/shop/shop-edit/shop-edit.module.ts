import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { ComponentModule } from '../../../component/component.module';

import { ShopEditComponent } from './shop-edit.component';

const routes: Routes = [
    { path: '', component: ShopEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ShopEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ShopEditModule { }
