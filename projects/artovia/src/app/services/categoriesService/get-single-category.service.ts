import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class GetSingleCategoryService {

  constructor(private _http: HttpClient) { }
  getProductsByCategory(categoryId: string): Observable<any> {
    return this._http.get(`${environment.getSingleCategory}/${categoryId}`);
  }
}
