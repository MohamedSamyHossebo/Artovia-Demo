// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SaveUserDataService } from '../auth/cookie/save-user-data.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(SaveUserDataService);
  const router = inject(Router);

  return authService.userData.pipe(
    take(1),
    map(user => {
      if (user) {
        return true; // السماح بالوصول
      } else {
        router.navigate(['/login']); // إعادة التوجيه إذا لم يكن مسجلاً
        return false;
      }
    })
  );
};