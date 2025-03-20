import { TestBed } from '@angular/core/testing';

import { EditeSubCategoriesService } from './edite-sub-categories.service';

describe('EditeSubCategoriesService', () => {
  let service: EditeSubCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditeSubCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
