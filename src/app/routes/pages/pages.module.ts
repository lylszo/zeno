import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StylesComponent } from './styles/styles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

/* Use this routes definition in case you want to make them lazy-loaded */
/*const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
];*/

@NgModule({
    imports: [
        // RouterModule.forChild(routes)
    ],
    declarations: [
        StylesComponent,
        LoginComponent,
        RegisterComponent,
        ForgetPasswordComponent
    ],
    exports: [
        RouterModule,
        StylesComponent,
        LoginComponent,
        RegisterComponent,
        ForgetPasswordComponent
    ]
})
export class PagesModule { }
