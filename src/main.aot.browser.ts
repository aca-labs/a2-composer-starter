/**
* @Author: Alex Sorafumo
* @Date:   19/10/2016 1:20 PM
* @Email:  alex@yuion.net
* @Filename: main.aot.browser.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:12 PM
*/

/* BOOTSTRAP APPLICATION */
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './compiled/.build/app/app.module.ngfactory';

declare var process: any;

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

if(!window['wp.loaded']){
    window['wp.loaded'] = []
}
window['wp.loaded'].push('main');
