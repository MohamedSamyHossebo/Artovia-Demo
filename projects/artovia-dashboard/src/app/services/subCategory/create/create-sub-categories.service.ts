import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';
@Injectable({
  providedIn: 'root'
})
export class CreateSubCategoriesService {
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http: HttpClient) { }
  createSubCategory(data: FormData): Observable<any> {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
        const headers=new HttpHeaders({authorization:`superAdmin ${token}`
        })
    return this._http.post(environment.supCategoryAPi,data,{headers});
  }
}
