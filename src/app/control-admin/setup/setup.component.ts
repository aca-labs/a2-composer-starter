/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 1:31 PM
* @Email:  alex@yuion.net
* @Filename: setup.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 3:18 PM
*/

import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services';

@Component({
  selector: 'setup-ui',
  styleUrls: [ './setup.styles.css' ],
  templateUrl: './setup.template.html'
})
export class SetupComponent {
    @Input() system: string = 'sys-B5';

    loading: any = {};

    blinds: any[] = [];
    blinds_list: any[] = [];

    outputs: any[] = [];
    output_list: any[] = [];
    active: any = {
        blinds: {},
        displays: {}
    };

    constructor(private app_service: AppService) {

    }

    ngOnInit() {
        this.loading = {
            displays: true,
            blinds: true
        };
    }

    isNew(data: any, old: any) {
        if(!old) return true;
        let cnt = 0;
        for(let i in data) {
            if(data[i]) cnt++;
        }
        let k_len = Object.keys(old).length;
        return cnt !== k_len;
    }

    setupBlindsList(blinds?: any[]) {
        let bs = blinds ? blinds : this.blinds;
        if(!bs) return;
        this.loading['blinds'] = true;
        let list: any[] = [];
        for(let i = 0; i < bs.length; i++) {
            let split_b = bs[i].module.split('_');

            console.log(bs[i]);
            let simple_b = split_b.slice(0, split_b.length-1).join('_');
            list.push({
                name: bs[i].title,
                mod: simple_b,
                index: split_b[split_b.length-1],
                item: bs[i]
            });
        }
        this.active['blinds'] = {};
        for(let i = 0; i < list.length; i++) {
            this.active['blinds'][i] = {};
        }
        console.log(list)
        setTimeout(() => {
            this.blinds_list = list;
            this.loading['blinds'] = false;
        }, 100);
    }

    setupOutputList(outputs?: any[]) {
        let outs = outputs ? outputs : this.outputs;
        if(!outs) return;
        this.loading['displays'] = true;
        let list: any[] = [];
        for(let o in outs) {
            if(!outs[o].no_audio) {
                let split_o = o.split('_');
                let simple_o = split_o.slice(0, split_o.length-1).join('_');
                list.push({
                    name: outs[o].title,
                    mod: simple_o,
                    index: split_o[split_o.length-1],
                    item: outs[o]
                });
            }
        }
        console.log(list);
        setTimeout(() => {
            this.output_list = list;
            this.loading['displays'] = false;
        }, 100);
    }

}
