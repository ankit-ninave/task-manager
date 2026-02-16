import { Component } from '@angular/core';
import { AuthService } from '../../authservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validator, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public l_loginform: FormGroup;

  constructor(
    private l_AuthService: AuthService,
    private l_RouterService: Router,
    private l_FormBuilder: FormBuilder
  ) {
    this.l_loginform = this.l_FormBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  lFN_Login() {
    // if (this.l_loginform.invalid) {
    //   this.l_loginform.markAllAsTouched();
    //   return;
    // }
    console.warn('this.l_loginform.value--->',this.l_loginform.value);
    const { name, password } = this.l_loginform.value;
    this.l_AuthService.lFN_login();
    this.l_RouterService.navigate(['/'])
    // this.l_AuthService.lFN_login(name, password).subscribe(() => {
    //   this.l_RouterService.navigate(['/dashboard']);
    // });
  }
}
