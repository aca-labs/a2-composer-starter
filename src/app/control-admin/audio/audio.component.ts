/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 1:31 PM
* @Email:  alex@yuion.net
* @Filename: audio.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 12:54 PM
*/

import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services';

@Component({
  selector: 'audio-ui',
  styleUrls: [ './audio.styles.css' ],
  templateUrl: './audio.template.html'
})
export class AudioComponent {
    @Input() system: string = 'sys-B5';

    outputs: any = null;
    output_list: any[] = [];
    output_mute: any = {};
    output_volume: any = {};

    inputs: any = null;
    input_list: any[] = [];
    input_mute: any = {};
    input_volume: any = {};

    active: boolean[] = [];
    loading: boolean = false;
    setup_i_timer: any = null;
    setup_o_timer: any = null;
    vol_min: number = 0;
    vol_max: number = 100;

    constructor(private app_service: AppService) {

    }

    setupInputList() {
        if(!this.inputs) return;
        let list: any[] = [];
        for(let o in this.inputs) {
            list.push({
                name: this.inputs[o].name,
                mod: o.split('_')[0],
                index: o.split('_')[1],
                item: this.inputs[o]
            });
        }
        setTimeout(() => {
            this.input_list = list;
            this.loading = false;
        }, 100);
    }

    setupOutputList() {
        if(!this.outputs) return;
        let list: any[] = [];
        for(let o in this.outputs) {
            if(!this.outputs[o].no_audio) {
                list.push({
                    name: o.split('_').join(' '),
                    mod: o.split('_')[0],
                    index: o.split('_')[1],
                    item: this.outputs[o]
                });
            }
        }
        setTimeout(() => {
            this.output_list = list;
            this.loading = false;
        }, 100);
    }
}
