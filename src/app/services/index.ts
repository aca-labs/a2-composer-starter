/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 12:24 PM
* @Email:  alex@yuion.net
* @Filename: index.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:13 PM
*/

import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { SettingsService } from './settings.service';

export * from './app.service';
export * from './cache.service';
export * from './settings.service';

export const APP_SERVICES: any[] = [
	AppService,
	CacheService,
	SettingsService
];
