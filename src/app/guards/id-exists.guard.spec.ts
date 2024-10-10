import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { idExistsGuard } from './id-exists.guard';

describe('idExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => idExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
