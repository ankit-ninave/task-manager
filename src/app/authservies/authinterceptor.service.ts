import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../authservice.service';

@Injectable()

export class AuthinterceptorService implements HttpInterceptor {

  constructor(public l_AuthService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.l_AuthService.lFN_GetAccessToken();
    let l_authreq = token ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }) : req;

    return next.handle(l_authreq).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return this.l_AuthService.lFN_RefreshToken().pipe(switchMap(res => {
          const newToken = res.access_token;
          const l_RetryReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`)
          });
          return next.handle(l_RetryReq);

        })
      )
  }
      return throwError(() => error);

    })
    )

  }
}
