import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const idExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('Id');

  if (id !== null && id !== undefined) {
    return true;
  } else {

    const router = inject(Router); 
    router.navigate(['/not-found']); 
    return false; 
  }
};
