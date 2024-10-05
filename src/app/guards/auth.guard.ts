import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router)
  const localDate = localStorage.getItem("token")
  if (localDate != null) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }
};
