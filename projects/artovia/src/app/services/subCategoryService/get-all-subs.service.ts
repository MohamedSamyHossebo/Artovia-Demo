import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GetAllSubsService {

  constructor(private _http: HttpClient) { }
  getAllSubCategory(): Observable<any> {
    return this._http.get(environment.supCategoryAPi);
  }
  getSpecificSubCategory(_id: string): Observable<any> {
    return this._http.get(environment.baseApi + `/${_id}/subcategories`);
  }
  getSpecificSubProducts(_id:string):Observable<any> {
    return this._http.get(environment.supCategoryAPi+`/${_id}/products/allProducts`)
  }
}
