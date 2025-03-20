import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsService } from '../../services/productsService/get-products.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage,TranslateModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
  providers: [GetProductsService]
})
export class SingleProductComponent implements OnInit {
  _ActivatedRoute = inject(ActivatedRoute);
  _productDetails = inject(GetProductsService);
  productDetails: any[] = [];
  data: boolean = true;
  isZoomed: boolean = false;
  isDragging: boolean = false;
  zoomScale: number = 3;
  offsetX: number = 50;
  offsetY: number = 50;
  startX: number = 0;
  startY: number = 0;
  selectedImage = signal<string>('');
  _id: string = this._ActivatedRoute.snapshot.params['_id'];

  ngOnInit(): void {
    this._id = this._ActivatedRoute.snapshot.paramMap.get('_id') || '';
    this._id ? this.getProductDetails(this._id) : console.error('Invalid ID:', this._id);
  }
  
  getProductDetails(_id: string) {
    this._productDetails.getSingleProduct(_id).subscribe({
      next: (res) => {
        this.productDetails = res.data ? [res.data] : [];
        if (this.productDetails.length > 0 && this.productDetails[0].images?.length > 0) {
          this.selectedImage.set(this.productDetails[0].images[0].secure_url);
        }
        this.data = this.productDetails.length > 0;
      }
    });
  }
  changeImage(image: string) {
    const imgElement = document.querySelector('.main-image') as HTMLImageElement;
    if (imgElement) {
      imgElement.classList.add('slide-out');
      setTimeout(() => {
        this.selectedImage.set(image);
        imgElement.classList.remove('slide-out');
        imgElement.classList.add('slide-in');
        setTimeout(() => imgElement.classList.remove('slide-in'), 500);
      }, 300);
    } else {
      this.selectedImage.set(image);
      
    }
    this.selectedImage.set(image);
    this.isZoomed = false;
    this.offsetX = 50; 
    this.offsetY = 50;
  }
  toggleZoom(state: boolean) {
    this.isZoomed = state;
    if (!state) {
      this.offsetX = 50;
      this.offsetY = 50;
    }
  }
  startDragging(event: MouseEvent) {
    if (!this.isZoomed) return;
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }
  onDrag(event: MouseEvent) {
    if (!this.isZoomed || !this.isDragging) return;
    const moveX = event.clientX - this.startX;
    const moveY = event.clientY - this.startY;
    this.offsetX = Math.max(0, Math.min(100, this.offsetX - moveX * 0.3));
    this.offsetY = Math.max(0, Math.min(100, this.offsetY - moveY * 0.3));
    this.startX = event.clientX;
    this.startY = event.clientY;
  }
  stopDragging() {
    this.isDragging = false;
  }

}
