import { TestBed } from '@angular/core/testing';

import { SortSubCategoriesService } from './sort-sub-categories.service';

describe('SortSubCategoriesService', () => {
  let service: SortSubCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortSubCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
