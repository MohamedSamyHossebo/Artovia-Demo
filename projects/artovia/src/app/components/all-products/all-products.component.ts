import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { GetProductsService } from '../../services/productsService/get-products.service';
import { GetCategoriesService } from '../../services/categoriesService/get-categories.service';
import { GetSingleCategoryService } from '../../services/categoriesService/get-single-category.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage,TranslateModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
  providers: [GetProductsService, GetCategoriesService, GetSingleCategoryService],
})
export class AllProductsComponent implements OnInit {
  isFilterOpen = false;
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  count: number = 1;
  _productService = inject(GetProductsService);
  _categoryService = inject(GetCategoriesService);
  _categoryProductService = inject(GetSingleCategoryService);

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.data || [];
        this.filteredProducts = [...this.products];
      }
    });
  }

  getAllCategories() {
    this._categoryService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data.data;
      }
    });
  }


  filterByCategory(categoryId: string) {
    this._categoryProductService.getProductsByCategory(categoryId).subscribe({
      next: (data) => {
        if (Array.isArray(data.data)) {
          this.filteredProducts = data.data;
        } else {
          this.filteredProducts = [];
        }
      },
      error: (err) => console.error("Error fetching category products", err)
    });
  }

  

  toggleFilterSidebar() {
    this.isFilterOpen = !this.isFilterOpen;
  }
  resetFilter() {
    this.filteredProducts = [...this.products];
  }
}
