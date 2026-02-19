import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { routes } from './app.routes';
import { AppTitleStrategy } from './app-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    Title,
    { provide: TitleStrategy, useClass: AppTitleStrategy }
  ]
};
