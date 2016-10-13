import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { App } from './app.component';
import { SimpleComponent } from './simple';
import { AdvancedAppComponent } from './advanced';
import { NoContent } from './errors';
//import { APP_MAIN_COMPONENTS } from './main';

// Application wide providers
const APP_PROVIDERS: any[] = [

];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    SimpleComponent,
    AdvancedAppComponent,
    NoContent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ACA_WIDGETS_MODULE,
    ACA_COMPOSER_MODULE
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})
export class AppModule {

}
