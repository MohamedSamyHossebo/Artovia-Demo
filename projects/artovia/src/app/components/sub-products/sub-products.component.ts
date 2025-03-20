import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GetAllSubsService } from '../../services/subCategoryService/get-all-subs.service';

@Component({
  selector: 'app-sub-products',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage, CommonModule, RouterLink],
  templateUrl: './sub-products.component.html',
  styleUrl: './sub-products.component.scss',
  providers: [GetAllSubsService]
})
export class SubProductsComponent implements OnInit {
  _subProducts = inject(GetAllSubsService);
  _ActivatedRoute = inject(ActivatedRoute);
  _id: string = this._ActivatedRoute.snapshot.params['_id'];
  count: number = 1;
  data: boolean = true;
  subProducts: any[] = [];

  ngOnInit(): void {
    this._id = this._ActivatedRoute.snapshot.paramMap.get('_id') || '';
    this._id ? this.getSubCategoryProducts(this._id) : console.error('Invalid ID:', this._id);

  }
  getSubCategoryProducts(_id: string) {
    this._subProducts.getSpecificSubProducts(_id).subscribe({
      next: (data) => {
        this.subProducts = data.data
        this.data = this.subProducts.length > 0;
      }
    })
  }
}
