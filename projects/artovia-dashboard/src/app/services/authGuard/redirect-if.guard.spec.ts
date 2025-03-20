import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectIfGuard } from './redirect-if.guard';

describe('redirectIfGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectIfGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
