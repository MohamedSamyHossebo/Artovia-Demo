import { TestBed } from '@angular/core/testing';

import { SortCategoriesService } from './sort-categories.service';

describe('SortCategoriesService', () => {
  let service: SortCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
