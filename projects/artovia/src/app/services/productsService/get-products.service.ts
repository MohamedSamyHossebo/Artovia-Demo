import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private _http: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this._http.get(environment.prouctsApi);
  }
  getSingleProduct(_id:string): Observable<any> {
    return this._http.get(environment.prouctsApi+`/${_id}`);
  }

}
