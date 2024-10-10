import { CanActivateFn } from '@angular/router';

export const idExistsGuard: CanActivateFn = (route, state) => {
  return true;
};
