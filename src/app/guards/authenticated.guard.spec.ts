import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, provideRouter, Router, RouterStateSnapshot } from '@angular/router';

import { authenticatedGuard } from './authenticated.guard';
import { routes } from '../app.routes';
import { TokenService } from '../services/token.service';

describe('authenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    const tokenService = TestBed.inject(TokenService);
    spyOn(tokenService, 'getAuthToken').and.returnValue('faketoken');
    const activatedRoute = TestBed.inject(ActivatedRoute);
    expect(executeGuard(activatedRoute.snapshot, {} as RouterStateSnapshot)).toBeTruthy();
  });

  it('should return false if no token exists', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    expect(executeGuard(activatedRoute.snapshot, {} as RouterStateSnapshot)).toBeFalsy();
  });
});
