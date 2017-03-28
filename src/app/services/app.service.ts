/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   12/01/2017 2:25 PM
* @Email:  alex@yuion.net
* @Filename: app.service.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 10:25 AM
*/

import { Injectable, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SystemsService } from '@aca-1/a2-composer';
import { NotificationService } from '@aca-1/a2-widgets';

import { SettingsService } from './settings.service';

@Injectable()
export class AppService{

	r_event: any = null;
	private _system: string = '';
	private sys_change: any = null;
	private _sys_obs: any = null;

    constructor(private _title: Title, 
    			private router: Router,
    			private route: ActivatedRoute, 
    			private notify: NotificationService,
    			private settings: SettingsService, 
    			private systems: SystemsService) {
        settings.parent = this;

        this._sys_obs = new Observable((observer: any) => {
        	this.sys_change = observer;
            this.sys_change.next(this._system);
        });
    }

    initSystem(sys: string) {
    	this._system = sys;
        if(!this._system || this._system === '') {
            if(localStorage) {
                this._system = localStorage.getItem('ACA.CONTROL.system');
                if(this.sys_change) {
                    this.sys_change.next(this._system);
                }
            }
            if(!this._system || this._system === '') {
                this.navigate('bootstrap');
            } else {
                this.navigate(this._system);
            }
        } else {
            if(this.sys_change) {
                this.sys_change.next(this._system);
            }
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    	this.sys_change.complete();
    }

    get Settings() {
        return this.settings;
    }

    get Systems() {
    	return this.systems;
    }

    get system() {
    	return this._sys_obs;
    }

    set title(str: string) {
    	this._title.setTitle(`${str} | Control Admin`);
    }

    navigate(path: string, query?: any) {
        if(!this.systems.resources.authLoaded){
            this.router.navigate([path], { queryParams: query ? query : {} });
        } else {
            this.router.navigate([path]);
        }
    }

	error(msg: string) {
		let message = msg ? msg : `Error`;
		this.notify.add(`<div class="display-icon error" style="font-size:2.0em"></div><div>${message}</div>`, 'error-notify');
	}

	success(msg: string) {
		let message = msg ? msg : `Success`;
		this.notify.add(`<div class="display-icon success" style="font-size:2.0em"></div><div>${message}</div>`, 'success-notify');
	}

	info(msg: string) {
		let message = msg ? msg : `Information`;
		this.notify.add(`<div class="display-icon info" style="font-size:2.0em"></div></div><div>${message}</div>`, 'info-notify');
	}

}
