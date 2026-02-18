import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UiService } from "../services/ui.service";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests = 0;
  constructor(private ui: UiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.warn('LoaderInterceptor triggered for:', req.url); // <--- debug

    this.requests++;
    this.ui.lFN_ShowLoader();
    return next.handle(req).pipe(
      finalize(() => {
        this.requests--;
        if (this.requests === 0) this.ui.lFN_HideLoader();
      })
    );
  }
}
