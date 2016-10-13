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
            // Setup composer
        systems.setup({
            id: 'AcaEngine',
            scope: 'public',
            oauth_server: 'http://localhost:3000/auth/oauth/authorize',
            oauth_tokens: 'http://localhost:3000/auth/token',
            redirect_uri: 'http://localhost:9000/oauth-resp.html',
            api_endpoint: 'http://localhost:3000/control/',
            proactive: true
        });
    }
}
