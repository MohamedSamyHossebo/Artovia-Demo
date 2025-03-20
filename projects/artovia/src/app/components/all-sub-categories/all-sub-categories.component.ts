import { Component, inject, OnInit } from '@angular/core';
import { GetAllSubsService } from '../../services/subCategoryService/get-all-subs.service';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-sub-categories',
  standalone: true,
  imports: [NgOptimizedImage, TranslateModule, RouterLink],
  templateUrl: './all-sub-categories.component.html',
  styleUrl: './all-sub-categories.component.scss',
  providers: [GetAllSubsService]
})
export class AllSubCategoriesComponent implements OnInit {
  subCategories: any[] = [];
  _subCategoryService = inject(GetAllSubsService)

  ngOnInit(): void {
    this.getAllSubCategories();
  }

  getAllSubCategories() {
    this._subCategoryService.getAllSubCategory().subscribe({
      next: (data) => {
        this.subCategories = data.data;
      }
    })
  };

}
