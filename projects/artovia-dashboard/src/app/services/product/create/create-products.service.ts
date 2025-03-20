import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';
@Injectable({
  providedIn: 'root'
})
export class CreateProductsService {
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http: HttpClient) { }

  createProduct(data: FormData): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: `superAdmin ${token}`
    })
    const url = environment.prouctsApi;
    return this._http.post(url, data, { headers });

  }
}
