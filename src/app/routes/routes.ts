import { LayoutComponent } from '../layout/layout.component';

import { StylesComponent } from './pages/styles/styles.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' }
        ]
    },

    // Not lazy-loaded routes
    { path: 'styles', component: StylesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgetPassword', component: ForgetPasswordComponent },

    // Not found
    { path: '**', redirectTo: 'home' }

];
