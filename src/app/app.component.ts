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
				private systems: SystemsService
            ) {
            // Dynamic components need a view to build then
        modal.view = view;
        notify.view = view;
        let url = 'http://localhost:3000';
            // Setup composer
        systems.setup({
            id: 'AcaEngine',
            scope: 'public',
            host: 'localhost',
            port: '3001',
            oauth_server: `${url}/auth/oauth/authorize`,
            oauth_tokens: `${url}/auth/token`,
            redirect_uri: `${location.origin}/oauth-resp.html`,
            api_endpoint: `${url}/control/`,
            proactive: true
        });
        window['debug'] = true;
        window['debug_module'] = ['COMPOSER_WS', 'COMPOSER_BINDING'];
    }
}
