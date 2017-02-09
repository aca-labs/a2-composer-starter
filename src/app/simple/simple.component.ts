/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   17/10/2016 4:10 PM
* @Email:  alex@yuion.net
* @Filename: simple.component.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:12 PM
*/

import { Component } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';
import { SystemsService } from '@aca-1/a2-composer';

@Component({
  selector: 'simple',
  styleUrls: [ './simple.style.css' ],
  templateUrl: './simple.template.html'
})
export class SimpleComponent {
    image: string = 'http://static1.squarespace.com/static/52142586e4b0c09536a144ad/t/561327b2e4b06f521722e448/1469084115046/?format=1500w';
    title: string = 'Composer Starter Kit';
    system: any = null;
    system_data: any = {
        'sys-B0': {
            Cam: [{
                power: true,
                connected: true,
                $power: function (pwr: any) {
                    this.connected = !this.connected;
                }
            }],
            Lights: [{}],
            Projector: [{}, {}, {}]
        }
    }
    sys_index: string = '-1';
    mod_index: string = '-1';
    system_list: any[] = null;
    dev_list: any[] = [];
    loading: boolean = false;
    loading_mod: boolean = false;
    device: any = null;

    constructor(private router: Router, private systems: SystemsService) {
        let system = systems.get('sys_1-10');
        this.loadSystems();
    }

    loadSystems() {
        if(!this.systems.resources){
            this.systems.resources.get('System').get().then((sys_list: any) => {
                this.system_list = sys_list.results;
            }, (err: any) => {
                console.error(err);
            });
        } else {
            setTimeout(() => {
                this.loadSystems();
            }, 500);
        }
    }

    loadModules(val: any) {
        if(!this.sys_index || this.sys_index === '' || this.sys_index == '-1') return;
        this.loading = true;
        setTimeout(() => {
            this.dev_list = [];
            this.mod_index = '-1';
            let sys = this.system_list[this.sys_index];
            if(sys) {
                this.systems.resources.get('System').types({id: sys.id}).then((devices: any) => {
                    this.system = sys;
                    let keys = Object.keys(devices);
                    for(let i = 0; i < keys.length; i++) {
                        for(let j = 0; j < devices[keys[i]]; j++) {
                            this.dev_list.push(`${keys[i]} ${j+1}`);
                        }
                    }
                    setTimeout(() => {
                        this.loading = false;
                    }, 100);
                }, (err: any) => {
                    console.error(err);
                    this.loading = false;
                });
            }
        }, Math.floor(Math.random() * 3000) + 500);
    }

    loadDevice(val: any) {
        if(!this.mod_index || this.mod_index === '' || this.mod_index == '-1') return;
        this.loading_mod = true;
        this.device = null;
        setTimeout(() => {
            let sys = this.system_list[this.sys_index];
            let dev = this.dev_list[this.mod_index].split(' ');
            let device: any = {
                module: dev.slice(0, dev.length-1).join(' '),
                index: dev[dev.length-1]
            }
            if(sys && device) {
                this.systems.resources.get('SystemModule').get({system_id: sys.id, module: device.module, index: device.index }).then((mod: any) => {
                    this.device = mod.results[this.mod_index];
                    this.device.module = device.module;
                    this.device.index = device.index;
                    //this.module = mod;
                    setTimeout(() => {
                        this.loading_mod = false;
                    }, 100);
                }, (err: any) => {
                    console.error(err);
                    this.loading_mod = false;
                });
            }
        }, Math.floor(Math.random() * 3000) + 500);
    }

    navigate(route: string) {
        this.router.navigate([route]);
    }
}
