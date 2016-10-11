/* IMPORT POLYFILLS AND VENDOR CODE */
import './polyfills.browser';
import './vendor.browser';

/* BOOTSTRAP APPLICATION */
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './compiled/.build/app/app.module.ngfactory';

declare var process: any;

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
