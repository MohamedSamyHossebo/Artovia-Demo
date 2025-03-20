import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { authInterceptorInterceptor } from './services/interceptor/auth-interceptor.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,

    }),
    provideHttpClient(withInterceptors([authInterceptorInterceptor]))]
};
