import { TestBed } from '@angular/core/testing';

import { EditeCategoryService } from './edite-category.service';

describe('EditeCategoryService', () => {
  let service: EditeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
