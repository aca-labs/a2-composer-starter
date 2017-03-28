/**
* @Author: Alex Sorafumo
* @Date:   30/09/2016 2:42 PM
* @Email:  alex@yuion.net
* @Filename: vendor.browser.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 06/02/2017 4:20 PM
*/

// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Other libraries
declare let ENV: any;

import 'hammerjs';


if ('production' === ENV) {
  // Production


} else {
  // Development

}

if(!window['wp.loaded']){
    window['wp.loaded'] = []
}
window['wp.loaded'].push('vendor');
