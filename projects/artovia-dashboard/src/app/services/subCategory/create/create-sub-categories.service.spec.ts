import { TestBed } from '@angular/core/testing';

import { CreateSubCategoriesService } from './create-sub-categories.service';

describe('CreateSubCategoriesService', () => {
  let service: CreateSubCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSubCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
