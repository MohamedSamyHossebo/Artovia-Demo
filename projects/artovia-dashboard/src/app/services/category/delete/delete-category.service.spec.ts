import { TestBed } from '@angular/core/testing';

import { DeleteCategoryService } from './delete-category.service';

describe('DeleteCategoryService', () => {
  let service: DeleteCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
