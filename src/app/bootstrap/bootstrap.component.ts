/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   16/01/2017 9:43 AM
* @Email:  alex@yuion.net
* @Filename: bootstrap.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 31/01/2017 11:16 AM
*/

import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services';

@Component({
  selector: 'bootstrapper',
  styleUrls: [ './bootstrap.styles.css' ],
  templateUrl: './bootstrap.template.html'
})
export class Bootstrapper {
    query: any = null;
    setup: any = false;
    sys_id: string = '';
    sys_text: string[] = [];
    system_list: any[] = [];
    select_sys: boolean = false;
    sys: any = null;
    system: number = 0;
    module: string = '';
    sys_timer: any = null;

    constructor(private route: ActivatedRoute, private app_service: AppService) {
    	if(sessionStorage) {
    		sessionStorage.setItem('trust', 'true');
    	}
        this.query = this.route.queryParams.subscribe(params => {
            if(params['clear'] && params['clear'] == true) {
                if(localStorage) {
                    localStorage.removeItem('ACA.CONTROL.system');
                    this.setup = true;
                }
            }
        });
    }

    ngOnInit() {

        if(localStorage) {
            let sys = localStorage.getItem('ACA.CONTROL.system');
            this.setup = (sys && sys !== '') ? false : true;
        }
        if(!this.setup) {
            this.redirect();
            return;
        }
        this.loadSettings();
        setTimeout(() => {
            if(this.query) {
                this.query.unsubscribe();
                this.query = null;
            }
        }, 1000);
    }

    loadSettings() {
        if(!this.app_service.Settings.setup) {
            setTimeout(() => {
                this.loadSettings();
            }, 500);
            return;
        }
        let mod = this.app_service.Settings.get('module');
        if(mod && mod !== '') {
            this.module = mod;
        }
        this.loadSystems();
    }
    /**
     * Loads the list of buildings. Retrys of no buildings returned
     * @param  {number} tries Number of attempts to get the buildings
     * @return {void}
     */
    loadSystems(tries: number = 0) {
        let systems = this.app_service.Systems.resources.get('System');
        if(systems) {
            tries = 0;
            systems.get({ offset: '0', limit: 500 }).then((sys_list: any) => {
                this.system_list = [];
                if(sys_list){
                    let count = sys_list.total;
                    if(count > 500) {
                        let iter = Math.ceil((count - 500) / 500);
                        for(let i = 0; i < iter; i++) {
                            systems.get({ offset: (i+1) * 500, limit: 500 }).then((sys_list: any) => {
                                if(sys_list) {
                                    this.addSystems(sys_list.results);
                                }
                            });
                        }
                    }
                    this.addSystems(sys_list.results);
                } else if(tries < 20) {
                    tries++;
                    this.sys_timer = setTimeout(() => {
                        this.loadSystems(tries);
                        this.sys_timer = null;
                    }, 200 * tries);
                }
            }, (err: any) => {
                if(tries < 20) {
                    tries++;
                    this.sys_timer = setTimeout(() => {
                        this.loadSystems(tries);
                    this.sys_timer = null;
                    }, 200 * tries);
                }
            });
        } else {
            if(tries < 20) {
                tries++;
                this.sys_timer = setTimeout(() => {
                    this.loadSystems(tries);
                    this.sys_timer = null;
                }, 200 * tries);
            }
        }
    }

    addSystems(list: any[]) {
        console.log(this.module, list);
            // Only add systems that have the set module
        if(this.module && this.module !== ''){
            for(let sys of list) {
                if(sys.modules.indexOf(this.module) >= 0) {
                    this.system_list.push(sys);
                }
            }
        } else { // No module set add all systems to list
            this.system_list = this.system_list.concat(list);
        }
        if(this.system_list && this.system_list.length > 0) {
            this.select_sys = true;
            if(!this.sys) {
            	this.sys = this.system_list[0];
            	this.sys_id = this.sys.id;
            }
        }
    }
    /**
     * Called when the user selects a system from the dropdown
     * @param  {number} index Index of the system in the systems list.
     * @return {void}
     */
    selectSystem(system: any) {
        if(system){
            this.sys = system;
            this.sys_id = this.sys.id
        }
    }
    /**
     * Redirects the user to the set application
     * @return {void}
     */
    redirect() {
        if(localStorage) {
            let sys_id = localStorage.getItem('ACA.CONTROL.system');
            if(sys_id && sys_id !== '') {
                this.app_service.navigate(`${sys_id}`, { 'trust': true, 'fixed_device': true });
            } else {
                this.setup = true;
                this.ngOnInit();
            }
        }
    }
   /**
    * Configures the settings for the kiosk on the device
    * @return {void}
    */
    configure() {
        if(this.sys_id && this.sys_id !== ''){
            if(localStorage) {
                localStorage.setItem('ACA.CONTROL.system', this.sys_id);
            }
            if(this.sys_timer) {
                clearTimeout(this.sys_timer);
            }
            this.app_service.navigate(`${this.sys_id}`, { 'trust': true, 'fixed_device': true });
        }
    }
}
