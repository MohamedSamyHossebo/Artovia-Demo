import { AfterViewInit, Component, ElementRef, inject, NgZone, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { GetProductsService } from '../../../services/productsService/get-products.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, NgOptimizedImage, TranslateModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  providers: [GetProductsService],

})
export class CardsComponent implements OnInit, AfterViewInit {
  @ViewChildren('cardEl') cardEl!: QueryList<ElementRef>;

  private _productsService = inject(GetProductsService);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);

  products: any[] = [];

  ngOnInit(): void {
    this.getProducts();
  }
  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      threshold: 0.1,
      rootMargin: '50px'
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

      this.cardEl.forEach(cardEl => {
        observer.observe(cardEl.nativeElement);
      });
    });
  }

  getProducts() {
    this._productsService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.data;

        setTimeout(() => {
          this.setupIntersectionObserver();
        }, 100);
      }
    );
  }
}