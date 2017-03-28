/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   17/10/2016 4:10 PM
* @Email:  alex@yuion.net
* @Filename: app.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 01/02/2017 4:23 PM
*/

import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService, NotificationService } from '@aca-1/a2-widgets';
import { CommsService, SystemsService } from '@aca-1/a2-composer';
import './shared/mock-system';

import { AppService, CacheService } from './services';

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
export class AppComponent {
    r_event: any = null;

    constructor(private view: ViewContainerRef,
                private http: CommsService,
                private cache: CacheService,
                private app: AppService,
                private modal: ModalService,
                private notify: NotificationService,
				private systems: SystemsService,
                private router: Router,
                private route: ActivatedRoute
            ) {
            // Dynamic components need a view to build then
        modal.view = view;
        notify.view = view;
        this.init();
    }

    ngOnInit() {
    }

    init() {
        if(!this.app.Settings.setup) {
            setTimeout(() => {
                this.init();
            }, 500);
            return;
        }
        let host = location.hostname;
        let protocol = location.protocol;
        let port = location.port;
        let route = this.app.Settings.get('route');
        if(!route) route = '';
        if(location.origin.indexOf('localhost') >= 0 || location.origin.indexOf('.aca:3000') >= 0) {
            host = this.app.Settings.get('domain');
            protocol = this.app.Settings.get('protocol');
            port = ((protocol === 'https:') ? '443' : '80');
            route = '';
        }
        let url = `${protocol}//${host}`;
        let config: any = {
            id: 'AcaEngine',
            scope: 'public',
            host: host,
            protocol: protocol,
            port: port,
            oauth_server: `${url}/auth/oauth/authorize`,
            oauth_tokens: `${url}/auth/token`,
            redirect_uri: `${location.origin}${route}/oauth-resp.html`,
            api_endpoint: `${url}/control/`,
            proactive: true,
            http: true
        };
        let env = this.app.Settings.get('env');
        if(env.indexOf('dev') >= 0){
            config.port = '3000';
            config.mock = true;
            config.http = false;
        }
            // Setup composer
        this.systems.setup(config);
    }
}
