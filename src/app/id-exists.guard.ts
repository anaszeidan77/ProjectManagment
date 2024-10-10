import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const idExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('id'); 

  if (id !== null && id !== undefined) {
    return true; 
  } else {

    const router = new Router(); 
    router.navigate(['/not-found']); 
    return false; // منع الانتقال
  }
};
