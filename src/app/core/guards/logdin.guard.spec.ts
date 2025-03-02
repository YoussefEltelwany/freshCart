import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logdinGuard } from './logdin.guard';

describe('logdinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logdinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
