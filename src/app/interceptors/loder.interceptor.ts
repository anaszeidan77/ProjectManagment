import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoderService } from '../services/loder.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoderService);

  loaderService.show();

  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
