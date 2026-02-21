import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../features/users/users.component';
import { EmployeeBasicInfoComponent } from './components/employee-basic-info/employee-basic-info.component';

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
