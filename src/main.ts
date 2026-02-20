import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import packageInfo from '../package.json';

(window as Window & { APP_VERSION?: string }).APP_VERSION = packageInfo.version;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
