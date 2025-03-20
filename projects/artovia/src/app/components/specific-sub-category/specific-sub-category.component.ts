import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetAllSubsService } from '../../services/subCategoryService/get-all-subs.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-specific-sub-category',
  standalone: true,
  imports: [CommonModule,RouterLink,NgOptimizedImage,TranslateModule],
  templateUrl: './specific-sub-category.component.html',
  styleUrl: './specific-sub-category.component.scss',
  providers: [GetAllSubsService]
})
export class SpecificSubCategoryComponent implements OnInit {
  _ActivatedRoute = inject(ActivatedRoute);
  _subCategoryProducts = inject(GetAllSubsService);
  products: any[] = [];
  data: boolean = true;

  _id: string = this._ActivatedRoute.snapshot.params['_id'];

  ngOnInit(): void {
    this._id = this._ActivatedRoute.snapshot.paramMap.get('_id') || '';
    this._id ? this.getSubCategoryProducts(this._id) : console.error('Invalid ID:', this._id);

  }

  getSubCategoryProducts(_id: string) {
    this._subCategoryProducts.getSpecificSubProducts(_id).subscribe({
      next: (res) => {
        this.products = res.data;
        this.products.length == 0 ? this.data = false : this.data = true;
      }
    })
  }

}
