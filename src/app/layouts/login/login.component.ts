import { Component } from '@angular/core';
import { AuthService } from '../../authservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validator, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthinterceptorService } from '../../authservies/authinterceptor.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public l_loginform: FormGroup;

  constructor(
    private l_AuthService: AuthService,
    private l_RouterService: Router,
    private l_FormBuilder: FormBuilder
  ) {
    this.l_loginform = this.l_FormBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  lFN_Login() {
    if (this.l_loginform.invalid) {
      this.l_loginform.markAllAsTouched();
      return;
    }
    const { email, password } = this.l_loginform.value;
    //this.l_RouterService.navigate(['/'])


    this.l_AuthService.lFN_login(email, password).subscribe(({
      next:(res)=>{
      console.warn('Login success', res);
      this.l_RouterService.navigate(['/']);
      },
       error:(err)=>{
      console.error('Login failed', err);
      },

    }))




  }

  lFN_GetFormDetails(value:string){
  return this.l_loginform.get(value);
  }
}
