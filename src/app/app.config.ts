import { ApplicationConfig, EnvironmentProviders, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiApiModule, Configuration } from './api';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

let apiModuleWithProviders = ApiApiModule.forRoot(() => new Configuration({ basePath: 'https://localhost:7263' }));
let apiProviders: (Provider | EnvironmentProviders)[] = apiModuleWithProviders?.providers ?? [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    ...apiProviders
  ]
};
