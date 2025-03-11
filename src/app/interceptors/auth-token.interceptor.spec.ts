import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { authTokenInterceptor } from './auth-token.interceptor';
import { TokenService } from '../services/token.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('authTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authTokenInterceptor(req, next));

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no outstanding requests
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add token to request', () => {
    const tokenService = TestBed.inject(TokenService);
    const faketoken = 'faketoken';
    spyOn(tokenService, 'getAuthToken').and.returnValue(faketoken);

    httpClient.get('/test').subscribe();
    const req = httpTestingController.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${faketoken}`);
    req.flush({});
  });
});
