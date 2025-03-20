import { TestBed } from '@angular/core/testing';

import { GetCategoriesService } from './get-categories.service';

describe('GetCategoriesService', () => {
  let service: GetCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
