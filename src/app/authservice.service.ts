import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GMDLogin } from './layouts/login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private l_LoginUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private l_RefreshUrl = 'https://api.escuelajs.co/api/v1/auth/refresh-token';
  private l_SessionMaxAge = 5 * 60 * 1000;
  private l_AccessTokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('access_token'));
  private l_AccessTokenSec = this.l_AccessTokenSubject.asObservable();

  constructor(
    public http: HttpClient,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.lFN_StartSessionMonitor();
  }

  lFN_login(l_loginValue: string,l_PasswordValue: string): Observable<GMDLogin> {
    return this.http
      .post<GMDLogin>(this.l_LoginUrl, {
        email: l_loginValue,
        password: l_PasswordValue,
      })
      .pipe(
        tap((res) => {
          const now = Date.now().toString();
          sessionStorage.setItem('access_token', res.access_token);
          sessionStorage.setItem('login_time', now);
          this.l_AccessTokenSubject.next(res.access_token);
        })
      );
  }

  lFN_logout() {
    sessionStorage.clear(); // This removes access_token AND login_time
    this.l_AccessTokenSubject.next(null);
    this.router.navigate(['/login']); // Redirect the user immediately
  }

  lFN_IsLoggedIn(): boolean {
    return !!this.l_AccessTokenSubject.value;
  }

  lFN_GetAccessToken(): string | null {
    return this.l_AccessTokenSubject.value;
  }

  lFN_RefreshToken(): Observable<GMDLogin> {
    return this.http.post<GMDLogin>(this.l_RefreshUrl, {}).pipe(
      tap((res) => {
        this.l_AccessTokenSubject.next(res?.access_token);
      })
    );
  }

  private lFN_StartSessionMonitor() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        const loginTime = sessionStorage.getItem('login_time');
        if (loginTime) {
          const elapsed = Date.now() - parseInt(loginTime, 10);
          if (elapsed >= this.l_SessionMaxAge) {
            this.ngZone.run(() => this.lFN_logout());
          }
        }
      }, 10000); // Check every 10 seconds
    });
  }
}
