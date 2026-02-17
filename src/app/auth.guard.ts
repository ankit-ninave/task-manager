import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authservice.service';
export const authGuard: CanActivateFn & CanActivateChildFn = (route, state) => {
  const router = inject(Router)
  const l_AuthService = inject(AuthService)

  if (state.url === '/login') {
    return true;
  }



  if(l_AuthService.lFN_IsLoggedIn()){
    return true;
  }else{
    //router.navigate(['/login']);
    return router.parseUrl('/login');
    //return false;
  }
};
