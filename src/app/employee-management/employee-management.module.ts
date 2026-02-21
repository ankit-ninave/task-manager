// employee-management.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeBasicInfoComponent } from './components/employee-basic-info/employee-basic-info.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeManagementRoutingModule,
    EmployeeBasicInfoComponent
  ]
})
export class EmployeeManagementModule {}