/* IMPORT POLYFILLS AND VENDOR CODE */
//import './polyfills.browser';
//import './vendor.browser';

/* BOOTSTRAP APPLICATION */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare let process: any;

if (process.env.APP_ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
