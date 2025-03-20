import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../models/login/logIn.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }
  signIn(userData: User): Observable<any> {
    return this._http.post(environment.loginApi, userData)
  }
}
