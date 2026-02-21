import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './layouts/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { ReportsComponent } from './features/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'employeemanagement',
        loadChildren: () =>
          import('../app/employee-management/employee-management.module').then(
            (emp) => emp.EmployeeManagementModule
          ),
      },
      {
        path: 'user',
        component: UsersComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];
