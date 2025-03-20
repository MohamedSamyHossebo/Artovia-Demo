import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private _http: HttpClient) { }
  resetPassword(data: { email: string }): Observable<any> {

    return this._http.patch(environment.forgetPasswordApi, data)
  }
  resetOtp(data: {
    email: string,
    code: string,
    password: string

  }) {
    return this._http.patch(environment.resetOtpApi, data)
  }
}
