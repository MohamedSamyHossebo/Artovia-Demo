import { TestBed } from '@angular/core/testing';

import { DeleteProductsService } from './delete-products.service';

describe('DeleteProductsService', () => {
  let service: DeleteProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
