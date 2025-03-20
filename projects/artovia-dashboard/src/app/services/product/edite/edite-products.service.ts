import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';
@Injectable({
  providedIn: 'root'
})
export class EditeProductsService {
  private saveUserDataService = inject(SaveUserDataService);
  private apiUrl = environment.prouctsApi;
  
  constructor(private _http: HttpClient) { }

  editeProd(productId: string, data: any): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: `superAdmin ${token}`
    })
    return this._http.put(`${this.apiUrl}/${productId}`, data, { headers })
  }
}