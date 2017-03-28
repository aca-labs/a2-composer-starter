/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   17/10/2016 4:10 PM
* @Email:  alex@yuion.net
* @Filename: app.module.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 12/01/2017 2:15 PM
*/

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ACA_WIDGETS_MODULE } from '@aca-1/a2-widgets';
import { ACA_COMPOSER_MODULE } from '@aca-1/a2-composer';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { Bootstrapper } from './bootstrap';
import { APP_COMPONENTS } from './control-admin';
import { NoContent } from './errors';
import { APP_SERVICES } from './services';
import { POPUPS } from './popups'

// Application wide providers
const APP_PROVIDERS: any[] = [

];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    Bootstrapper,
    ...APP_COMPONENTS,
    ...POPUPS,
    NoContent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ACA_WIDGETS_MODULE,
    ACA_COMPOSER_MODULE
  ],
  entryComponents: [
      ...POPUPS
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
    ...APP_SERVICES
  ]
})
export class AppModule {

}
