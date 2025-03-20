import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/auth/loginService/login.service';
import { CookieService } from 'ngx-cookie-service';
import { SaveUserDataService } from '../../services/auth/cookie/save-user-data.service';

import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    SpinnerComponent,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private toastr = inject(ToastrService);
  private _AuthLogInService = inject(LoginService);
  private cookieService = inject(CookieService);
  private saveUserService = inject(SaveUserDataService);
  private _router = inject(Router);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  errorFromLogin: string = '';
  isLogin$: Observable<boolean> = this.saveUserService.isLoggedIn; // متغير لحالة تسجيل الدخول

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });


  ngOnInit(): void {
  }

  loginUser(loginForm: any) {
    this.loadingSubject.next(true);
    if (this.loginForm.valid) {
      this._AuthLogInService.signIn(this.loginForm.value)
        .pipe(
          tap((data: any) => {
            if (data.success) {
              this.cookieService.set('token', data.accessToken);
              this.saveUserService.saveUserData();
              this.toastr.success("Welcome Back!")
              this._router.navigate(['/dashboard-all-products']); // هيتنفذ بعد تنفيذ `saveUserData`
            } else {
              this.errorFromLogin = data.message;
            }
          }),
          finalize(() => {
            this.loadingSubject.next(false);
          })
        )
        .subscribe({
          error: () => {
            this.errorFromLogin = 'Login Failed. Please try again.';
            alert(this.errorFromLogin);
          }
        });
    }
  }
}
