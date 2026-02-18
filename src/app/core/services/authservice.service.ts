import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UiService } from './ui.service';
import { GMDLogin } from '../../layouts/login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private sessionMaxAge = 5 * 60 * 1000; // 5 minutes
  private accessToken$ = new BehaviorSubject<string | null>(sessionStorage.getItem('access_token'));

    // private l_LoginUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private l_RefreshUrl = 'https://api.escuelajs.co/api/v1/auth/refresh-token';
  // private l_SessionMaxAge = 5 * 60 * 1000;
  // private l_AccessTokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('access_token'));
  // private l_AccessTokenSec = this.l_AccessTokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private ui: UiService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.startSessionMonitor();
  }

  login(email: string, password: string): Observable<GMDLogin> {
    return this.http.post<GMDLogin>(this.loginUrl, { email, password }).pipe(
      tap((res) => {
        sessionStorage.setItem('access_token', res.access_token);
        sessionStorage.setItem('login_time', Date.now().toString());
        this.accessToken$.next(res.access_token);

        // optional success notification
        this.ui.lFN_ShowSuccess('Login successful');
      })
    );
  }

  lFN_logout() {
    sessionStorage.clear();
    this.accessToken$.next(null);
    this.router.navigate(['/login']);
  }

  lFN_IsLoggedIn(): boolean {
    return !!this.accessToken$.value;
  }

  private startSessionMonitor() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        const loginTime = sessionStorage.getItem('login_time');
        if (loginTime) {
          const elapsed = Date.now() - parseInt(loginTime, 10);
          if (elapsed >= this.sessionMaxAge) {
            this.ngZone.run(() => this.lFN_logout());
          }
        }
      }, 10000);
    });
  }

  lFN_GetAccessToken(): string | null {
  return this.accessToken$.value; // BehaviorSubject stores the latest token
}

lFN_RefreshToken(): Observable<GMDLogin> {
  return this.http.post<GMDLogin>(this.l_RefreshUrl, {}).pipe(
    tap((res) => {
      if (res?.access_token) {
        // update token in memory and sessionStorage
        sessionStorage.setItem('access_token', res.access_token);
        this.accessToken$.next(res.access_token);
      } else {
        // fallback: logout if no token returned
        this.lFN_logout();
      }
    })
  );
}

}
