// import { HttpInterceptorFn } from '@angular/common/http';
// import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
// import { Router } from '@angular/router'; 
// import { inject } from '@angular/core';

// export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
//   const token = localStorage.getItem('token');
//   const cloned = token ? req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`
//     }
//   }) : req;

//   return next(cloned).pipe(
//     catchError((error) => {
//       const router = inject(Router); 
//       switch (error.status) {
//         case 401:
//           console.log('status ',error.status);
//           console.error('Unauthorized access - redirecting to Access Denied page.');
//           router.navigate(['/accessDenied']);
//           break;
//         case 403:
//           console.log('status ',error.status);
          
//           console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
          
//           router.navigate(['/accessDenied']);
//         break;
//         case 404:
//           console.error('Requested resource not found.');
//           break;
//         case 500:
//           console.error('Internal server error.');
//           break;
//         default:
//           console.error('An unexpected error occurred.');
//           break;
//       }

//       return throwError(() => new Error('An error occurred while processing the request.'));
//     })
//   );
// };







import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { Router } from '@angular/router'; 
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');
  const cloned = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(cloned).pipe(
    catchError((error) => {
      const router = inject(Router); 
      const authService = inject(AuthService);
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          take(1),
          tap(() => {
           
            return next(req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }));
          }),
          catchError(() => {
            router.navigate(['/login']); 
            return throwError(() => new Error('Token refresh failed'));
          })
        );
      }

      switch (error.status) {
        case 403:
          router.navigate(['/accessDenied']);
          break;
        case 404:
          console.error('Requested resource not found.');
          break;
        case 500:
          console.error('Internal server error.');
          break;
        default:
          console.error('An unexpected error occurred.');
          break;
      }
      return throwError(() => new Error('An error occurred while processing the request.'));
    })
  );
};


