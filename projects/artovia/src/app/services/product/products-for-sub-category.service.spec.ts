import { TestBed } from '@angular/core/testing';

import { ProductsForSubCategoryService } from './products-for-sub-category.service';

describe('ProductsForSubCategoryService', () => {
  let service: ProductsForSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsForSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
