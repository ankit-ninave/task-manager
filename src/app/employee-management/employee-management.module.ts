import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeBasicInfoComponent } from './employee-basic-info/employee-basic-info.component';



@NgModule({
  declarations: [EmployeeBasicInfoComponent],
  imports: [
    CommonModule,ReactiveFormsModule,CommonModule,EmployeeManagementRoutingModule
  ]
})
export class EmployeeManagementModule { }
