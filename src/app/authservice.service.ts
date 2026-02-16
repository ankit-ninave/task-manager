import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private l_LoggedIn = false;
  constructor() { }

  lFN_login(){
    this.l_LoggedIn = true;
  }
  lFN_logout(){
    this.l_LoggedIn = false;
  }

    lFN_IsLoggedIn(): boolean {
    return this.l_LoggedIn;
  }
}
