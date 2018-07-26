import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';

import { routes } from './routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {}
