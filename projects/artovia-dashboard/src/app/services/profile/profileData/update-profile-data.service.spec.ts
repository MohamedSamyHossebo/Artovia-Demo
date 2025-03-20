import { TestBed } from '@angular/core/testing';

import { UpdateProfileDataService } from './update-profile-data.service';

describe('UpdateProfileDataService', () => {
  let service: UpdateProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
