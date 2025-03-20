import { SortSubCategoriesService } from './../services/subCategory/sortSubCategories/sort-sub-categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteSubCategoriesService } from '../services/subCategory/delete/delete-sub-categories.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateSubCategoriesService } from '../services/subCategory/create/create-sub-categories.service';
import { EditeSubCategoriesService } from '../services/subCategory/edite/edite-sub-categories.service';
import { SelectCategoryService } from '../services/shared/category/select-category.service';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent implements OnInit {
  _build = inject(FormBuilder);
  _sortSubsService = inject(SortSubCategoriesService);
  _deleteSubsService = inject(DeleteSubCategoriesService);
  _createSubsService = inject(CreateSubCategoriesService);
  _editeSubCategory = inject(EditeSubCategoriesService);
  _CategorySelection = inject(SelectCategoryService);
  _http = inject(HttpClient);

  form!: FormGroup;
  subCategories: any[] = [];
  selectedFile: string[] = [];
  _sortInput: any[] = [];
  editingSubCategoryId: string = '';


  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();
  private toastr = inject(ToastrService);


  ngOnInit(): void {
    this.form = this._build.group({
      imageFile: [null, [Validators.required]],
      categorySelection: ['', [Validators.required]],
      subCategoryName: ['', [Validators.required, Validators.min(3)]],
    });

    this.getSubCategory();
    this._CategorySelection.getCategory();
    this._CategorySelection.categories$.subscribe(categories => {
      this._sortInput = categories;
    });
  }
  getSubCategory() {
    this._sortSubsService.getAllSubCategories().pipe(
      finalize(() => {
        this.loadingSubject.next(false);
      }) 
    ).subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
      }
      , error: (error) => {
        this.toastr.error('Error Getting category');

        
      }
    }
    )

  }

  addSubCategory() {
    const selectedCategoryId = this.form.get('categorySelection')?.value;
    const subCategoryName = this.form.get('subCategoryName')?.value;
    if (!selectedCategoryId) {
      this.toastr.error('No category selected!');
      return;
    }
    if (!subCategoryName) {
      this.toastr.error('Subcategory name is required!');
      return;
    }
    if (this.selectedFile.length === 0) {
      this.toastr.error('No image selected!');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile[0]);
    formData.append('name', subCategoryName);
    formData.append('categoryId', selectedCategoryId);

    console.log('📤 Sending FormData:', {
      name: subCategoryName,
      categoryId: selectedCategoryId,
      image: this.selectedFile[0],
    });
    this.loadingSubject.next(true); // تفعيل اللودينج قبل بدء العملية
    this._createSubsService.createSubCategory(formData).pipe(
      finalize(() => {
        this.loadingSubject.next(false);
      })
    ).subscribe({
      next: (res: any) => {
        this.toastr.success('SubCategory Added');
        this.getSubCategory();
        this.resetForm();
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message);  
        } else {
          this.toastr.error('An unexpected error occurred'); 
        }
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      this.selectedFile.push(file)
    }
  }

  deleteSubCategory(_id: number) {
    console.log(_id)
    this._deleteSubsService.deleteSubCat(_id).subscribe({
      next: (res: number) => {
        this.toastr.warning('SubCategory Deleted Successfully!')
        this.getSubCategory();
      }
    })
  }
  editeSubCategory(item: any) {
    this.editingSubCategoryId = item._id;
    this.form.patchValue({
      subCategoryName: item.name,
      categorySelection: item.categoryId._id,
    });
  }
  UpdateSubCategory() {
    const formData = new FormData();
    formData.append('name', this.form.value.subCategoryName);
    if (this.selectedFile.length > 0) {
      formData.append('image', this.selectedFile[0]); 
    }
    const subcategoryId = this.editingSubCategoryId;
    this._editeSubCategory.editeCat(subcategoryId, formData).subscribe({
      next: (res: any) => {
        this.toastr.info('SubCategory Updated')
        this.resetForm();
        this.getSubCategory();
      },
      error: (error) => {
        this.toastr.error(error.error.message)
      }
    })

  }
  resetForm() {
    this.form.reset();
    this.selectedFile = [];
  }

}
