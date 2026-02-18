import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { UiService } from "./services/ui.service";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { ErrorInterceptor } from "./interceptors/errorinterceptor";
import { AuthService } from "./services/authservice.service";
import { ApiService } from "./services/apiservice";
import { AuthInterceptorService } from "../authservies/authinterceptor.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ApiService,
    AuthService,
    UiService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, // optional for token
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) throw new Error('CoreModule is already loaded!');
  }
}
