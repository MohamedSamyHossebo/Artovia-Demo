import { Component, inject, OnInit, AfterViewInit, ElementRef, Renderer2, NgZone, QueryList, ViewChildren } from '@angular/core';
import { GetCategoriesService } from '../../../services/categoriesService/get-categories.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brows-cards',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, NgOptimizedImage, TranslateModule],
  templateUrl: './brows-cards.component.html',
  styleUrl: './brows-cards.component.scss',
  providers: [GetCategoriesService],  // أضف الخدمة هنا

})
export class BrowsCardsComponent implements OnInit, AfterViewInit {
  @ViewChildren('cardElement') cardElements!: QueryList<ElementRef>;
  
  _CategoriesServise = inject(GetCategoriesService);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);
  
  categories: any[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              this.renderer.addClass(entry.target, 'animate');
            });
            observer.unobserve(entry.target);
          }
        });
      }, options);
      this.cardElements.forEach(cardElement => {
        observer.observe(cardElement.nativeElement);
      });
    });
  }

  getAllCategories() {
    this._CategoriesServise.getAllCategory().subscribe((response: any) => {
      this.categories = response.data;
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    });
  }
}
