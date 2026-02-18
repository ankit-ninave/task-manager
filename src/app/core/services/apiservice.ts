import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  lFN_Get(url: string, options?: any): Observable<any> {
    return this.http.get<any>(url, options);
  }

  lFN_Post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post<any>(url, body, options);
  }

  lFN_Put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put<any>(url, body, options);
  }

  lFN_Delete(url: string, options?: any): Observable<any> {
    return this.http.delete<any>(url, options);
  }
}
