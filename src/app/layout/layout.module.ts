import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
@NgModule({
    imports: [ RouterModule ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        ToolbarComponent
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        ToolbarComponent
    ]
})
export class LayoutModule { }
