/**
* @Author: Alex Sorafumo
* @Date:   19/10/2016 1:20 PM
* @Email:  alex@yuion.net
* @Filename: main.browser.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:12 PM
*/

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

if(!window['wp.loaded']){
    window['wp.loaded'] = []
}
window['wp.loaded'].push('main');
