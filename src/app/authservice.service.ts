import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GMDLogin } from './layouts/login'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private l_LoginUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private l_RefreshUrl = 'https://api.escuelajs.co/api/v1/auth/refresh-token';

  private l_AccessTokenSubject = new BehaviorSubject<string | null>(  sessionStorage.getItem('access_token')
);
  private l_AccessTokenSec = this.l_AccessTokenSubject.asObservable();

  constructor(public http: HttpClient) { }

  lFN_login(l_loginValue: string, l_PasswordValue: string): Observable<GMDLogin> {
    return this.http.post<GMDLogin>(this.l_LoginUrl,
      { email: l_loginValue, password: l_PasswordValue }
    ).pipe(tap(res => {
        sessionStorage.setItem('access_token', res.access_token);
      this.l_AccessTokenSubject.next(res.access_token)
    }))
  }

  lFN_logout() {
    this.l_AccessTokenSubject.next(null)
  }

  lFN_IsLoggedIn(): boolean {
    return !!this.l_AccessTokenSubject.value;
  }

  lFN_GetAccessToken(): string | null {
    return this.l_AccessTokenSubject.value;
  }

  lFN_RefreshToken(): Observable<GMDLogin> {
    return this.http.post<GMDLogin>(this.l_RefreshUrl, {}).pipe(
      tap(res => {
        this.l_AccessTokenSubject.next(res?.access_token);
      })
    );
  }
}
