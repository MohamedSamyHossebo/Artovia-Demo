import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
import { SaveUserDataService } from '../../services/auth/cookie/save-user-data.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const saveUserDataService = inject(SaveUserDataService); // استيراد الخدمة
  const token = cookieService.get('token');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `superAdmin ${token}`
      }
    });

    return next(clonedReq).pipe(
      catchError((error) => {
        if (error.status === 401 && saveUserDataService.refreshToken) {
          saveUserDataService.refreshToken()?.subscribe(() => {
            return next(req);
          });
        }
        throw error;
      })
    );
  }

  return next(req);
};
