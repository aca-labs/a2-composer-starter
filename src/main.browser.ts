/**
* @Author: Alex Sorafumo
* @Date:   30/09/2016 2:39 PM
* @Email:  alex@yuion.net
* @Filename: main.browser.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 30/01/2017 2:31 PM
*/

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
