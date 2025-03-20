import { Component, inject, OnInit } from '@angular/core';
import { GetCategoriesService } from '../../../services/categoriesService/get-categories.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  providers: [GetCategoriesService],

})
export class CarouselComponent implements OnInit {
  _CategoriesServise = inject(GetCategoriesService);
  private translate = inject(TranslateService);

  categories: any[] = [];
  constructor() {
    // جلب اللغة المخزنة في localStorage أو تعيين الافتراضية للإنجليزية
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._CategoriesServise.getAllCategory().subscribe((response: any) => {
      this.categories = response.data
    });
  }

}
