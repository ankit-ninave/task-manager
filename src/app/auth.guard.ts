import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/authservice.service';
export const authGuard: CanActivateFn & CanActivateChildFn = (route, state) => {
  const router = inject(Router)
  const l_AuthService = inject(AuthService)

  console.warn('state.url',state.url);
  if (state.url === '/login') {
    return true;
  }

  if(l_AuthService.lFN_IsLoggedIn()){
    return true;
  }else{
    //router.navigate(['/login']);
    console.warn('ffffffffffffffffff');
    return router.parseUrl('/login');
    //return false;
  }
};
