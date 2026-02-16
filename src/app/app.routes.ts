import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './layouts/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
                // loadComponent:()=>import('./features/dashboard/dashboard.component').then(m=>m.DashboardComponent)
            }
        ]
    },
    {  path: 'login', component: LoginComponent}
];
