import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class EditeSubCategoriesService {
  private apiUrl = environment.supCategoryAPi;
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http:HttpClient) { }
    editeCat(subcategoryId: string, data:FormData):Observable<any>{
      const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
      const headers=new HttpHeaders({authorization:`superAdmin ${token}`
          })
      return this._http.put(`${this.apiUrl}/${subcategoryId}`, data,{headers})
    }
}
