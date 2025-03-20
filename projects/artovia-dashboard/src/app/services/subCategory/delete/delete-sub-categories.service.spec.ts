import { TestBed } from '@angular/core/testing';

import { DeleteSubCategoriesService } from './delete-sub-categories.service';

describe('DeleteSubCategoriesService', () => {
  let service: DeleteSubCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSubCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
