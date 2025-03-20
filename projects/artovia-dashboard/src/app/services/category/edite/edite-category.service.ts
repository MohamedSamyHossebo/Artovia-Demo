import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';
@Injectable({
  providedIn: 'root'
})
export class EditeCategoryService {
  private apiUrl = environment.baseApi;
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http: HttpClient) { }

  editeCat(categoryId: string, data: FormData): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: `superAdmin ${token}`
    })
    return this._http.put(`${this.apiUrl}/${categoryId}`, data, { headers })
  }
}
