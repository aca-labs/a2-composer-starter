/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   17/10/2016 4:10 PM
* @Email:  alex@yuion.net
* @Filename: app.component.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:12 PM
*/

/*
* Angular 2 decorators and services
*/
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ModalService, NotificationService } from '@aca-1/a2-widgets';
import { SystemsService } from '@aca-1/a2-composer';

/*
* App Component
* Top Level Component
*/
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [ './app.style.css' ],
    template: `
    <div class="app">
        <router-outlet></router-outlet>
    </div>
    `
})
export class App {
    constructor(private view: ViewContainerRef,
                private modal: ModalService,
                private notify: NotificationService,
				private systems: SystemsService,

            ) {
            // Dynamic components need a view to build then
        modal.view = view;
        notify.view = view;
        let url = location.origin;
        let dev = true;
        let settings = {
            id: 'AcaEngine',
            scope: 'public',
            host: location.hostname,
            port: dev ? '3000' : location.port,
            oauth_server: `${url}/auth/oauth/authorize`,
            oauth_tokens: `${url}/auth/token`,
            redirect_uri: `${location.origin}/oauth-resp.html`,
            api_endpoint: `${url}/control/`,
            proactive: true,
            mock: dev,
            http: !dev
        }
            // Setup composer
        systems.setup(settings);
    }
}
