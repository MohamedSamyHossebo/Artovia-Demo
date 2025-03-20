import { TestBed } from '@angular/core/testing';

import { GetAllSubsService } from './get-all-subs.service';

describe('GetAllSubsService', () => {
  let service: GetAllSubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllSubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
