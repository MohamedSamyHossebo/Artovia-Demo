import { TestBed } from '@angular/core/testing';

import { SubCategoryServiceService } from './sub-category-service.service';

describe('SubCategoryServiceService', () => {
  let service: SubCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
