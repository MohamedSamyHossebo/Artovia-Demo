import { TestBed } from '@angular/core/testing';

import { EditeProductsService } from './edite-products.service';

describe('EditeProductsService', () => {
  let service: EditeProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditeProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
