import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SaveUserDataService } from '../auth/cookie/save-user-data.service';
import { map, take } from 'rxjs/operators';

export const redirectIfAuth: CanActivateFn = () => {
  const authService = inject(SaveUserDataService);
  const router = inject(Router);

  return authService.userData.pipe(
    take(1),
    map(user => {
      if (user) {
        router.navigate(['/dashboard-home']); // إعادة التوجيه إذا كان مسجلاً
        return false;
      }
      return true; // السماح بالوصول إذا لم يكن مسجلاً
    })
  );
};