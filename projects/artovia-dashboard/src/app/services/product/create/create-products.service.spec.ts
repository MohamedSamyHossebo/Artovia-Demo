import { TestBed } from '@angular/core/testing';

import { CreateProductsService } from './create-products.service';

describe('CreateProductsService', () => {
  let service: CreateProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
