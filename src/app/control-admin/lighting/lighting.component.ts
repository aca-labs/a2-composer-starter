/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 1:31 PM
* @Email:  alex@yuion.net
* @Filename: audio.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 3:15 PM
*/

import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services';

@Component({
  selector: 'lighting-ui',
  styleUrls: [ './lighting.styles.css' ],
  templateUrl: './lighting.template.html'
})
export class LightingComponent {
    @Input() system: string = 'sys-B5';

    loading: any = {};
    lights: any = null;
    lights_evt: any = null;
    std: string = 'Off';
    evt: any = 0;
    preset: any = { std: 'Off', evt: 0 };
    faders: any[] = [];
    fader_value: any = {};
    group: number = 1;
    lvl: any = '';

    val_min: number = 0;
    val_max: number = 100;

    constructor(private app_service: AppService) {

    }

    ngOnInit() {
        this.loading = {
            faders: true,
            std: true,
            evt: true
        }
    }
}
