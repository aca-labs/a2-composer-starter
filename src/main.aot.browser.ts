/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   30/09/2016 2:41 PM
* @Email:  alex@yuion.net
* @Filename: main.aot.browser.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 30/01/2017 2:31 PM
*/

/* BOOTSTRAP APPLICATION */
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './compiled/.build/app/app.module.ngfactory';

declare var process: any;
/*
if (process.env.ENV === 'production') {
    enableProdMode();
}
//*/
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

if(!window['wp.loaded']){
    window['wp.loaded'] = []
}

window['wp.loaded'].push('main');
