import { Component, inject, OnDestroy, OnInit, } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SortCategoriesService } from '../services/category/sortCategories/sort-categories.service';
import { HttpClient } from '@angular/common/http';
import { CreateCategoryService } from '../services/category/create/create-category.service';
import { DeleteCategoryService } from '../services/category/delete/delete-category.service';
import { EditeCategoryService } from '../services/category/edite/edite-category.service';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  _build = inject(FormBuilder);
  _sortService = inject(SortCategoriesService);
  _createService = inject(CreateCategoryService);
  _deleteService = inject(DeleteCategoryService);
  _editeService = inject(EditeCategoryService);
  _http = inject(HttpClient);
  form!: FormGroup;
  categories: any[] = [];
  selectedFile: string[] = [];
  editingCategoryId: string = '';
  private toastr = inject(ToastrService);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit() {
    this.form = this._build.group({
      categoryName: ['', [Validators.required, Validators.min(3)]],
      imageFile: [null, Validators.required]

    });
    this.getCategory();
  }

  getCategory() {
    this._sortService.getAllCategory().pipe(
      finalize(() => {
        this.loadingSubject.next(false);
      })
    ).subscribe({
      next: (res: any) => {
        this.categories = res.data;
      }
      , error: (error) => {
        this.toastr.error("Error Getting category")


      }
    }
    )
    this.selectedFile = [];
  }

  addCategory() {
    const formData = new FormData();
    formData.append('name', this.form.value.categoryName);
    formData.append('image', this.selectedFile[0]);
    this._createService.createCategory(formData).subscribe({
      next: (res: any) => {
        this.toastr.success("Added Category Successfully!")
        this.selectedFile = []
        this.resetForm();
      },
      error: (error) => {
        this.toastr.error("Error Creating category")

      }
    })
  }

  editeCategory(item: any) {
    this.editingCategoryId = item._id;
    this.form.patchValue({
      categoryName: item.name,
    });
  }

  updateCategory() {
    const formData = new FormData();
    formData.append('name', this.form.value.categoryName);
    if (this.selectedFile.length > 0) {
      formData.append('image', this.selectedFile[0]); 
    }
    const categoryId = this.editingCategoryId;
    this._editeService.editeCat(categoryId, formData).subscribe({
      next: (res: any) => {
        this.toastr.warning("Category updated successfully")
        this.resetForm();
        this.getCategory();
      },
      error: (error) => {
        this.toastr.error("Error updating category");
      }
    })
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.push(file)
    }
  }
  deleteCategory(_id: number) {
    this._deleteService.deleteCat(_id).subscribe({
      next: (res: number) => {
        this.toastr.warning("Category Deleted Successfully!");
        this.getCategory();
      }
    })
  }

  resetForm() {
    this.form.reset();
    this.selectedFile = [];
    this.ngOnInit()
  }
  ngOnDestroy(): void {
    this._sortService.getAllCategory();
  }
}
