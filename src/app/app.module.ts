/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   17/10/2016 4:10 PM
* @Email:  alex@yuion.net
* @Filename: app.module.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 01/02/2017 10:03 AM
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
import { SimpleComponent } from './simple';
import { AdvancedComponent } from './advanced';
import { SERVICES } from './services';
import { NoContent } from './errors';

// Application wide providers
const APP_PROVIDERS: any[] = [
    ...SERVICES
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    SimpleComponent,
    AdvancedComponent,
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
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})
export class AppModule {
}
