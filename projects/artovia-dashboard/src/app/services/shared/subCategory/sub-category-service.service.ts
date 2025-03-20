import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { SaveUserDataService } from '../../auth/cookie/save-user-data.service';
@Injectable({
  providedIn: 'root'
})
export class SupCategoryServiceService {
  private subCategoriesSource = new BehaviorSubject<any[]>([])
  subCategories$ = this.subCategoriesSource.asObservable();
  private saveUserDataService = inject(SaveUserDataService);

  constructor(private _http: HttpClient) { }
  getSubCategories() {
    const token = this.saveUserDataService.getToken(); // ✅ جلب التوكن المخزن
    const headers = new HttpHeaders({
      authorization: `superAdmin ${token}`
    })
    this._http.get<any[]>(environment.supCategoryAPi, { headers })
      .subscribe({
        next: (res: any) => {
          this.subCategoriesSource.next(res.data);
        },
        error: (error) => {
          console.error('❌ Error Fetching SubCategories:', error);
        }
      });
  }
}
