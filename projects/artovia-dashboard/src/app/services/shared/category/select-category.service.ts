import { Injectable } from '@angular/core';
import { SortCategoriesService } from '../../category/sortCategories/sort-categories.service';
import {  ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectCategoryService {
  
  private categoriesSubject = new ReplaySubject<any[]>(1); // يحفظ آخر قيمة
  categories$ = this.categoriesSubject.asObservable();
  

  constructor(private _sortService: SortCategoriesService) {}

  getCategory() {
    this._sortService.getAllCategory().subscribe({
      next: (res: any) => {
        // console.log('Full API Response:', res); // شوف كل البيانات الراجعة
        this.categoriesSubject.next(res.data);
        // console.log('Shared service data updated:', res.data);
      },
      error: (error) => {
        console.error('Error Getting category:', error);
      }
    });
  }
 
}
