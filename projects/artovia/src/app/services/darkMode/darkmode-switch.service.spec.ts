import { TestBed } from '@angular/core/testing';

import { DarkmodeSwitchService } from './darkmode-switch.service';

describe('DarkmodeSwitchService', () => {
  let service: DarkmodeSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkmodeSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
