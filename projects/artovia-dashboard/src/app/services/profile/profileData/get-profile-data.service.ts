import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class GetProfileDataService {
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http: HttpClient) { }
  getAllData(): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: `superAdmin ${token}`
    })

    return this._http.get(environment.getProfileData, { headers });
  }
}
