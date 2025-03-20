import { TestBed } from '@angular/core/testing';

import { GetSingleCategoryService } from './get-single-category.service';

describe('GetSingleCategoryService', () => {
  let service: GetSingleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSingleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
