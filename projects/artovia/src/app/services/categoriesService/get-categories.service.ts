import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  constructor(private _http: HttpClient) { }
  getAllCategory(): Observable<any> {
    return this._http.get(environment.baseApi);
  }

}
