/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 12:24 PM
* @Email:  alex@yuion.net
* @Filename: index.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 10:06 AM
*/

import { AppService } from './app.service';
import { SettingsService } from './settings.service';
import { CacheService } from './cache.service';

export * from './app.service';
export * from './settings.service';
export * from './cache.service';

export const APP_SERVICES: any[] = [
    AppService,
    SettingsService,
    CacheService
];
