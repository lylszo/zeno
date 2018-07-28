import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../component/component.module';

import { routes } from './routes';

@NgModule({
    imports: [
    	SharedModule,
    	ComponentModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {}
