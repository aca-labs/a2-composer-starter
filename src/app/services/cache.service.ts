/**
* @Author: Alex Sorafumo
* @Date:   01/02/2017 9:55 AM
* @Email:  alex@yuion.net
* @Filename: cache.service.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:13 PM
*/

import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    constructor() {
		if(window.applicationCache){
			window.applicationCache.addEventListener('updateready', () => { this.onUpdateReady(); });
			if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
				this.onUpdateReady();
			}
			setInterval(function () {
                if(window.applicationCache.status !== window.applicationCache.UNCACHED){
    				window.applicationCache.update();
                }
			}, 300 * 1000);
		}
		console.debug('[ACA][CACHE_LOADER(A)] App Cache loader injected.');
        // Create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from child window
        eventer(messageEvent, (e: any) => {
            if(e.data == 'CACHE_RELOAD') {
                console.debug(`[ACA][CACHE_LOADER(A)] Injected cache loader has updated reloading page...`);
                location.reload();
            }
        }, false);
    }


    onUpdateReady() {
        window.applicationCache.swapCache();
        console.debug('[ACA][CACHE_LOADER(A)] New cache found... Cache swapped... Reloading...');
        setTimeout(function () {
            this.finishedUpdate();
        }, 1000);
    }

    finishedUpdate() {
        if(window.applicationCache.status === window.applicationCache.DOWNLOADING) {
            setTimeout(() => {
                this.finishedUpdate();
            }, 1000);
        } else {
            location.reload();
        }
    }
}
