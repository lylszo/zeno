import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    imports: [ SharedModule ],
    declarations: [
        LayoutComponent
        // SidebarComponent,
        // ToolbarComponent
    ],
    exports: [
        LayoutComponent
        // SidebarComponent,
        // ToolbarComponent
    ]
})
export class LayoutModule { }
