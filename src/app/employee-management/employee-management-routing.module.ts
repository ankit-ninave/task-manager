import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeBasicInfoComponent } from './employee-basic-info/employee-basic-info.component';
import { UsersComponent } from '../features/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeBasicInfoComponent, // default page for /employeemanagement
  },
  {
    path: 'user',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeManagementRoutingModule {}
