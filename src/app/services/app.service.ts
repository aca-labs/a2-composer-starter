/**
* @Author: Alex Sorafumo
* @Date:   13/09/2016 3:01 PM
* @Email:  alex@yuion.net
* @Filename: app.service.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:13 PM
*/

import { Injectable, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotificationService, ModalService } from '@aca-1/a2-widgets';

import { SettingsService } from './settings.service';

@Injectable()
export class AppService {
	site_name: string = 'CoTag Media';
	view: ViewContainerRef = null;
	constructor(private title: Title,
				private router: Router,
				private modal: ModalService,
				private notify: NotificationService,
				private settings: SettingsService) {
	}

	get Settings() {
		return this.settings;
	}

	get Modals() {
		return this.modal;
	}

	setView(view: any) {
		this.view = view;
		this.modal.view = view;
		this.notify.view = view;
		this.notify.canClose(false, 4000);
	}

	setTitle(title: string) {
		console.log('Set title to:', title);
		this.title.setTitle(title + ' | ' + this.site_name);
	}

	navigate(route: string, params: any = {}) {
		console.log('Navigate to:', route);
		this.router.navigate([ route ], { queryParams: params });
	}

	info(msg: string) {
		this.notify.add(`<div class="icon"><i class="material-icons">info_outline</i></div><div>${msg}</div>`, 'info-notify');
	}

	error(msg: string) {
		this.notify.add(`<div class="icon"><i class="material-icons">error</i></div><div>${msg}</div>`, 'error-notify');
	}

	success(msg: string) {
		this.notify.add(`<div class="icon"><i class="material-icons">done</i></div><div>${msg}</div>`, 'success-notify');
	}
};
