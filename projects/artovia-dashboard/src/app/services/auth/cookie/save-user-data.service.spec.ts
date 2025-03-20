import { TestBed } from '@angular/core/testing';

import { SaveUserDataService } from './save-user-data.service';

describe('SaveUserDataService', () => {
  let service: SaveUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
