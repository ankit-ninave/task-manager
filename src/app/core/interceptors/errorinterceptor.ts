import { Injectable } from "@angular/core";
import { UiService } from "../services/ui.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/authservice.service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private l_UiService: UiService, private l_AuthService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let msg = err.error?.message || 'Something went wrong!';
        if (err.status === 401) { this.l_AuthService.lFN_logout(); msg = 'Unauthorized'; }
        this.l_UiService.lFN_ShowError(msg);
        return throwError(() => err); // does not break UI
      })
    );
  }
}
