import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../core/services/authservice.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.lFN_GetAccessToken();

    // Attach Authorization header if token exists
    const authReq = token
      ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401: try to refresh token and retry request
        if (error.status === 401) {
          return this.authService.lFN_RefreshToken().pipe(
            switchMap((res) => {
              const newToken = res?.access_token;
              if (!newToken) {
                // If refresh fails, logout
                this.authService.lFN_logout();
                return throwError(() => new Error('Session expired'));
              }

              // Retry original request with new token
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
              });

              return next.handle(retryReq);
            }),
            catchError(() => {
              // If refresh fails, force logout
              this.authService.lFN_logout();
              return throwError(() => new Error('Session expired'));
            })
          );
        }

        // For other errors, just propagate
        return throwError(() => error);
      })
    );
  }
}
