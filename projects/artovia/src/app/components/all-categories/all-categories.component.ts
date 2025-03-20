import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetCategoriesService } from '../../services/categoriesService/get-categories.service';
import { ProductsForSubCategoryService } from '../../services/product/products-for-sub-category.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterLink,NgOptimizedImage,TranslateModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
  providers: [GetCategoriesService, ProductsForSubCategoryService],

})
export class AllCategoriesComponent implements OnInit {
  _categoryService = inject(GetCategoriesService);
  _specificCategory = inject(ProductsForSubCategoryService);
  _ActivatedRoute=inject(ActivatedRoute);
  categories: any[] = [];
  specificCategoryContainer: any[] = []

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._categoryService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data.data;
      }
    });
  }


}
