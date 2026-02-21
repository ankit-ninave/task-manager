import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UiService } from "../services/ui.service";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests = 0;
  constructor(private l_UiService: UiService  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests++;
    this.l_UiService?.lFN_ShowLoader();
    return next.handle(req).pipe(
      finalize(() => {
        console.warn('requests out ',this.requests);
        this.requests--;
        if (this.requests === 0) this.l_UiService.lFN_HideLoader();
      })
    );
  }
}
