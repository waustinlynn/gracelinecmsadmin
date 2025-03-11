import { ApplicationConfig, EnvironmentProviders, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiApiModule, Configuration } from './api';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authTokenInterceptor } from './interceptors/auth-token.interceptor';

let apiModuleWithProviders = ApiApiModule.forRoot(() => new Configuration({ basePath: 'https://localhost:7263', withCredentials: true }));
let apiProviders: (Provider | EnvironmentProviders)[] = apiModuleWithProviders?.providers ?? [];

export const httpEnvironmentProviders: EnvironmentProviders = provideHttpClient(withInterceptors([authTokenInterceptor]));

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    httpEnvironmentProviders,
    ...apiProviders
  ]
};
