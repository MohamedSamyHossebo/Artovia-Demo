import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { AllProductsService } from '../../product/sortProducts/all-products.service';
import { EditeProductsService } from '../../product/edite/edite-products.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private productsSubject = new ReplaySubject<any[]>(1); // يحفظ آخر قيمة
  products$ = this.productsSubject.asObservable();

  private productsValuSubject = new ReplaySubject<any[]>(1); // يحفظ آخر قيمة
  productsValue$ = this.productsValuSubject.asObservable();

  private productSubject = new ReplaySubject<any[]>(1); // يحفظ آخر قيمة
  editeProduct$ = this.productSubject.asObservable();

  constructor(private _sortProudctsService:AllProductsService,private _UpdateService:EditeProductsService) { }
  getProducts() {
    this._sortProudctsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productsSubject.next(res.data);
      },
      error: (error) => {
        console.error('Error Getting category:', error);
      }
    });
  }
  getProductsValueService() {
    this._sortProudctsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productsValuSubject.next(res.data);
        console.log("shared Service Data :", res)
      },
      error: (error) => {
        console.error('Error Getting category:', error);
      }
    });
  }
  editeProductService(productId:any,data:any){
  return  this._UpdateService.editeProd(productId,data);
  }
}
