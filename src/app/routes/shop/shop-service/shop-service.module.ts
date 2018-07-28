import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { ComponentModule } from '../../../component/component.module';

import { ShopServiceComponent } from './shop-service.component';

const routes: Routes = [
    { path: '', component: ShopServiceComponent }
];

@NgModule({
    imports: [
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ShopServiceComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ShopServiceModule { }
