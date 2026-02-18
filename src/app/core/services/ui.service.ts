import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UiService {
  // Private subjects
  private _loading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | null>(null);
  private _success = new BehaviorSubject<string | null>(null);

  // Public Observables for components to subscribe
  public loading$: Observable<boolean> = this._loading.asObservable();
  public errorMessage$: Observable<string | null> = this._error.asObservable();
  public successMessage$: Observable<string | null> = this._success.asObservable();

  // Loader controls
  lFN_ShowLoader() { this._loading.next(true); }
  lFN_HideLoader() { this._loading.next(false); }

  // Notifications
  lFN_ShowError(message: string) { 
    this._error.next(message); 
    setTimeout(() => this._error.next(null), 5000); 
  }

  lFN_ShowSuccess(message: string) { 
    this._success.next(message); 
    setTimeout(() => this._success.next(null), 3000); 
  }
}
