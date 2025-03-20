import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProductsService } from '../../services/product/create/create-products.service';
import { SelectCategoryService } from '../../services/shared/category/select-category.service';
import { SupCategoryServiceService } from '../../services/shared/subCategory/sub-category-service.service';
import { EditeProductsService } from '../../services/product/edite/edite-products.service';
import { AllProductsService } from '../../services/product/sortProducts/all-products.service';
import { CommonModule } from '@angular/common';
import { DeleteProductsService } from '../../services/product/delete/delete-products.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})

export class AllProductsComponent implements OnInit, OnDestroy {
  _build = inject(FormBuilder);
  _productService = inject(CreateProductsService);
  _editeProductService = inject(EditeProductsService);
  _allProductsService = inject(AllProductsService);
  _deletProductService = inject(DeleteProductsService);

  // Shared Services
  _sharedCategory = inject(SelectCategoryService);
  _subCategoryService = inject(SupCategoryServiceService);

  // vars
  form!: FormGroup;
  selectedFile: File[] = [];
  _sortInput: any[] = [];
  _supCategoryInput: any[] = [];
  _productValue: any[] = [];
  selectedImage: string | null = null;
  isZoomed: boolean = false;
  isHovered: boolean = false;
  transformOriginX: string = '50%';
  transformOriginY: string = '50%';
  products: any[] = [];
  productValue: string = '';
  btnDisabled: boolean = false;
  // injections
  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();
  private toastr = inject(ToastrService);
  private subscriptions: Subscription = new Subscription(); // متغير لتخزين الاشتراكات


  ngOnInit(): void {
    this.form = this._build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      categorySelection: ['', [Validators.required]],
      imageFile: [null, [Validators.required]],
      SubcategorySelection: ['', [Validators.required]]
    });

    // calling shared services
    this.subscriptions.add(
      this._sharedCategory.categories$.subscribe(categories => {
        this._sortInput = categories;
      })
    );

    this.subscriptions.add(
      this._subCategoryService.subCategories$.subscribe(subCategories => {
        this._supCategoryInput = subCategories;
      })
    );
    this._sharedCategory.getCategory();
    this._sharedCategory.categories$.subscribe(categories => {
      this._sortInput = categories;
    });
    this._subCategoryService.getSubCategories();
    this._subCategoryService.subCategories$.subscribe(subCategories => {
      this._supCategoryInput = subCategories;
    });
    this.getProducts();
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('price', this.form.value.price);
    formData.append('description', this.form.value.description);
    formData.append('quantity', this.form.value.quantity);
    this.selectedFile.forEach(file => {
      formData.append('images', file);
    })

    const productId = this.productValue;
    this._editeProductService.editeProd(productId, formData).subscribe({
      next: (res: any) => {
        this.toastr.info('Category updated successfully');
        this.getProducts();
        this.resetModel();
      },
      error: (error) => {
        console.error();
        this.toastr.info('Error updating category:', error.error.validationError);
        this.toastr.error(error.error.message)

      }
    })
  }

  addProduct() {
    this.btnDisabled = true;

    const existingProduct = this.products.find(p => p.title === this.form.value.title);
    if (existingProduct) {
      this.toastr.warning("This Title Already Used! Please Try Another title")
      this.btnDisabled = false;
      return;
    }

    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('price', this.form.value.price);
    formData.append('description', this.form.value.description);
    formData.append('quantity', this.form.value.quantity);
    formData.append('categoryId', this.form.value.categorySelection);
    formData.append('subcategoryId', this.form.value.SubcategorySelection);

    if (this.selectedFile.length > 0) {
      this.selectedFile.forEach(file => {
        formData.append('images', file);
      });
    }
    this.loadingSubject.next(true); // تفعيل اللودينج قبل بدء العملية
    this._productService.createProduct(formData).pipe(
      tap(),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    ).subscribe({next:(res: any) => {
      this.toastr.success("Product Created Successfully!")
      this.selectedFile = [];
      this.ngOnInit();
      this.products = res;
    },
    error:(error)=>{
      this.toastr.error(error.error.message)
    }
  });
  }


  getProducts() {
    this._allProductsService.getAllProducts().pipe(
      finalize(() => {
        this.loadingSubject.next(false);
      })
    ).subscribe({
      next: (res: any) => {
        this.products = Array.isArray(res.data) ? res.data : [res.data];
      },
      error: (error) => {
        this.toastr.error(error.error.message)
      }
    })
  }


  deleteProduct(id: number) {
    this._deletProductService.deleteProd(id).subscribe({
      next: (res: number) => {
        this.toastr.error("Product Deleted!")
        this.getProducts();
      },
      error: (error) => {
        this.toastr.warning("Error Deleting Product,Try Again")
        this.toastr.error(error.error.message)

      }
    })
    this.ngOnInit();
  }

  editeProductsValue(item: any) {
    this.btnDisabled = true;
    this.productValue = item._id;
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
      SubcategorySelection: item._id,
      categorySelection: item._id,
    });
    this._subCategoryService.getSubCategories();
    this._sharedCategory.getCategory();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFile.push(files[i]);
      }
    }
  }

  resetModel() {
    this._sharedCategory.getCategory();
    this.ngOnInit()
  }

  zoomImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.isZoomed = true;
  }

  closeZoom() {
    this.isZoomed = false;
  }
  resetZoom() {
    this.isHovered = false;
  }
  onMouseMove(event: MouseEvent) {
    this.isHovered = true; 
    const img = event.target as HTMLElement;
    const rect = img.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.transformOriginX = `${x}%`;
    this.transformOriginY = `${y}%`;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}