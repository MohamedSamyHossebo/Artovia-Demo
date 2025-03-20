import { TestBed } from '@angular/core/testing';

import { GetProfileDataService } from './get-profile-data.service';

describe('GetProfileDataService', () => {
  let service: GetProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
