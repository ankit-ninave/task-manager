import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  let l_IsloggedIn = localStorage.getItem('IsloggedIn');
  const router = inject(Router)

  if(l_IsloggedIn){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};
