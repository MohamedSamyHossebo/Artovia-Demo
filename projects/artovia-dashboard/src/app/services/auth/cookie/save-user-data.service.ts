import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SaveUserDataService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private cookieService: CookieService, private _router: Router,private http:HttpClient) {
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    const token = this.getToken();
    if (token) {
      this.saveUserData();
    }
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  saveUserData() {
    try {
      const token = this.getToken();
      if (!token) {
        console.warn('No token found!');
        this.isLoggedIn.next(false);
        this.tokenSubject.next(null);
        return;
      }

      const decodedToken: any = jwtDecode(token);
      this.userData.next(decodedToken);
      this.isLoggedIn.next(true);
      this.tokenSubject.next(token); // تحديث التوكن
    } catch (error) {
      console.error('Error decoding token:', error);
      this.userData.next(null);
      this.isLoggedIn.next(false);
      this.tokenSubject.next(null);
    }
  }
  refreshToken() {
    const currentToken = this.getToken();
    if (!currentToken) return;

    return this.http.get<any>('https://furniture-ochre-theta.vercel.app/api/v1/auth/refresh-token')
      .pipe(
        switchMap((response:any) => {
          const newToken = response.refreshToken;
          if (newToken) {
            this.cookieService.set('token', newToken); // تخزين التوكن الجديد
            this.saveUserData(); 
          }
          return of(newToken);
        }),
        catchError(error => {
          console.error('Error refreshing token:', error);
          this.logOut(); 
          return of(null);
        })
      );
  }


  logOut() {
    this.cookieService.delete('token');
    this.userData.next(null);
    this.isLoggedIn.next(false);
    this.tokenSubject.next(null);
    this._router.navigate(['/login']);
  }
}
