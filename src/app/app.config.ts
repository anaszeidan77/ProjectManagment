import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { loaderInterceptor } from './interceptors/loder.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()), 
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: loaderInterceptor,
      multi: true
    }
  ]
};
