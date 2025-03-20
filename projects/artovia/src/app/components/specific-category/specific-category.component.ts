import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetAllSubsService } from '../../services/subCategoryService/get-all-subs.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [CommonModule, RouterLink,NgOptimizedImage,TranslateModule],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss',
  providers: [GetAllSubsService]
})
export class SpecificCategoryComponent implements OnInit {
  subCategoryDetails: any[] = [];
  _subCategories = inject(GetAllSubsService);
  _ActivatedRoute = inject(ActivatedRoute);
  _id: string = this._ActivatedRoute.snapshot.params['_id'];
  data: boolean = true;
  
  ngOnInit(): void {
    this._id = this._ActivatedRoute.snapshot.paramMap.get('_id') || '';
    this._id ? this.getSubCategoryDetails(this._id) : console.error('Invalid ID:', this._id);

  }
  getSubCategoryDetails(_id: string) {
    this._subCategories.getSpecificSubCategory(_id).subscribe({
      next: (data) => {
        this.subCategoryDetails = data.data
        this.subCategoryDetails.length == 0 ? this.data = false : this.data = true;
      }
    })
  }
}
