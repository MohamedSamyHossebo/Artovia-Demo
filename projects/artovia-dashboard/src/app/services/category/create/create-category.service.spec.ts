import { TestBed } from '@angular/core/testing';

import { CreateCategoryService } from './create-category.service';

describe('CreateCategoryService', () => {
  let service: CreateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
