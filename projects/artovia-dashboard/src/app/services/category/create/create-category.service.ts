import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCategoryService {
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http: HttpClient) { }
  createCategory(data: FormData): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: `superAdmin ${token}`
    })
    return this._http.post(environment.baseApi, data, { headers });
  }
}
