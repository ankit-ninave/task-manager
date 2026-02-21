import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/authservice.service';
import { GNotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private l_AuthService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public l_GNotificationService:GNotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  lFN_Login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.l_AuthService.login(email, password).subscribe({
      next: () =>{ this.router.navigate(['/']);
        this.l_GNotificationService.lFN_ShowSuccess('Login Sucessful')
      },
      error: () => {} // error notification handled globally by ErrorInterceptor
    });
  }

  getControl(name: string) {
    return this.loginForm.get(name);
  }
    lFN_GetFormDetails(value:string){
  return this.loginForm.get(value);
  }
}
