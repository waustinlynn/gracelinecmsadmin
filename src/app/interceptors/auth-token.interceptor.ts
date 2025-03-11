import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenService.getAuthToken()}`
    }
  })
  return next(clonedReq);
};
