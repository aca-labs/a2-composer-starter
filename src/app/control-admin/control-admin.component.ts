/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   27/09/2016 5:38 PM
* @Email:  alex@yuion.net
* @Filename: advanced.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 3:04 PM
*/

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@aca-1/a2-widgets';
import { SystemsService } from '@aca-1/a2-composer';

import { AppService } from '../services';
import { ConfirmComponent } from '../popups';

@Component({
    selector: 'control-admin', 
    styleUrls: [ './control-admin.styles.css' ],
    templateUrl: './control-admin.template.html',
    animations: [
        trigger('menushow', [
            state('up',   style({ 'top': '-100%' })),
            state('down', style({ 'top':   '4.0em' })),
            transition('down <=> up', animate('0.7s ease-in-out')),
        ])
  ]
})
export class ControlAdminComponent {
    image: string = '';
    title: string = '';
    menu_id: string = '';
    tabs: string[] = ['setup', 'switching', 'audio', 'lighting'/*, 'vc'*/];
    system: string = '';
    sys_sub: any = null;
    started: boolean = true;
    state: string = 'shutdown';
    menu_open: boolean = false;
    menu_show: boolean = false;
    loading: boolean = true;
    active: any = {};
    outputs: any = [];
    display: any = {};
    display_cnt: number = 0;

    constructor(private router: Router, private route: ActivatedRoute, private app_service: AppService, private modal: ModalService, private systems: SystemsService) {
        this.modal.setup('Confirm', {
            size: 'small',
            component: ConfirmComponent
        });

        this.route.params.subscribe((params: any) => {
            if(params['tab_id']) {
                let menu_id = params['tab_id'];
                setTimeout(() => {
                  this.menu_id = menu_id && typeof menu_id === 'string' && this.tabs.indexOf(menu_id) >= 0 ? menu_id : this.tabs[0];
                  this.app_service.Settings.save('tab_id', menu_id);
                }, 20);
                    // 
                let system: string = null;
                if(this.router.url !== '/' && this.router.url !== '/bootstrap'){
                    system = params['system'];
                }
                this.app_service.initSystem(system);
            }
        });
    }

    ngOnInit() {
        this.sys_sub = this.app_service.system.subscribe((data: any) => {
            this.system = data;
            this.updateDisplays();
        }, (err: any) => {}, () => {});
        this.loadSettings();

    }

    ngOnDestroy() {
        if(this.sys_sub) {
          this.sys_sub.unsubscribe();
        }
    }

    updateDisplays(tries: number = 0) {
        if(tries > 20) return;
        this.loading = true;
        if(this.systems.resources){
            let r = this.systems.resources;
            console.log(r);
            let system = this.systems.resources.get('System');
            if(system){
                system.count({ id: this.system, module: 'Display' }).then((cnt: any) => {
                    if(cnt) {
                        this.display_cnt = cnt.count;
                        this.display = {};
                        this.outputs = [];
                        for(let i = 0; i < this.display_cnt; i++) {
                            this.display[i] = {};
                            this.outputs.push(i);
                        }
                        this.loading = false;
                    }

                }, () => {
                    setTimeout(() => { this.updateDisplays(tries); }, 200 * ++tries);
                });
            } else {
                setTimeout(() => { this.updateDisplays(tries); }, 200 * ++tries);
            }
        } else {
            setTimeout(() => { this.updateDisplays(tries); }, 200 * ++tries);
        }
    }

    loadSettings() {
        if(!this.app_service.Settings.setup) {
            setTimeout(() => {
                this.loadSettings();
            }, 500);
            return;
        }
        this.image = this.app_service.Settings.get('logo');
    }

    start() {
        console.log('Start');
        this.started = false;
        this.state = 'loading';
    }

    shutdown() {
        this.modal.open('Confirm', { data: { message : 'Are you sure you want to turn the system off?'} }).subscribe((data: any) => {
            if(data.type==='Ok') {
                this.started = true;
                this.state = 'loading';
            }
            data.close();
        }, (err: any) => {}, () => {})
    }

    updateRoute(tab: string) {
        setTimeout(() => {
            if(tab && tab !== '' && this.tabs.indexOf(tab) >= 0){
                this.menu_id = tab;
                this.app_service.navigate(`${this.system}/${this.menu_id}`);
                this.app_service.Settings.save('tab_id', this.menu_id);
            }
        }, 300);
    }

    toggleMenu() {
        if(this.menu_open) {
            this.closeMenu();
        } else {
            this.menu_open = true;
            this.menu_show = true;
        }
    }

    closeMenu() {
        this.menu_open = false;
        setTimeout(() => {
            this.menu_show = false;
        }, 200);
    }
}
