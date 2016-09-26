import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ACA_COMPOSER_MODULE } from '@aca-1/a2-composer';
import { ACA_WIDGET_MODULE } from '@aca-1/a2-widgets';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { Home } from './home';
import { NoContent } from './no-content';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
//import { APP_MAIN_COMPONENTS } from './main';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    Home,
    NoContent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    ACA_COMPOSER_MODULE,
    ACA_WIDGET_MODULE,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})
export class AppModule {

}
