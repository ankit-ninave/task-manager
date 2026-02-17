import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-basic-info',
  templateUrl: './employee-basic-info.component.html',
  // styleUrls: ['./employee-basic-info.component.css']
})
export class EmployeeBasicInfoComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],   // mandatory
      lastName: ['', Validators.required],    // mandatory
      email: ['', [Validators.required, Validators.email]], // mandatory + email format
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // mandatory + 10 digits
      department: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Employee Data:', this.employeeForm.value);
      // here you can call API to save the employee
    } else {
      this.employeeForm.markAllAsTouched(); // shows validation errors
    }
  }
}
