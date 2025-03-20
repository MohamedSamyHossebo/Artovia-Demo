import { SaveUserDataService } from './../cookie/save-user-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/signup/signUp.model';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private saveUserDataService = inject(SaveUserDataService);

  signUp(userData: User): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: token ? `superAdmin ${token}` : '',
      ln: `en`
    });

    return this._http.post(environment.signUpApi, userData, { headers }).pipe(
      tap(() => {
        this._router.navigate(['/dashboard-categories']);
      })
    );
  }
}
