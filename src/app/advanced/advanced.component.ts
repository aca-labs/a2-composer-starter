/**
* @Author: Alex Sorafumo
* @Date:   19/10/2016 1:20 PM
* @Email:  alex@yuion.net
* @Filename: main.browser.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:13 PM
*/


import { Component } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'advanced',
  styleUrls: [ './advanced.styles.css' ],
  templateUrl: './advanced.template.html',
  animations: [
      trigger('menushow', [
          state('up',   style({ 'top': '-100%' })),
          state('down', style({ 'top':   '4.0em' })),
          transition('down <=> up', animate('0.7s ease-in-out')),
      ])
  ]
})
export class AdvancedComponent {
    image: string = 'http://static1.squarespace.com/static/52142586e4b0c09536a144ad/t/561327b2e4b06f521722e448/1469084115046/?format=1500w';
    title: string = 'Composer Starter Kit';
    menu_open: boolean = false;
    phone_num: string = '';
    started: boolean = false;
    volume: number = 100;
    mute: boolean = false;
    in_call: boolean = false;
    extension: string = '';
    allow_phone: boolean = false;
    mic_on: boolean = false;
    displays: any[] = [
        { name: 'Left', model: 'SAMSUNG', connected: false },
        { name: 'Right', model: 'SAMSUNG', connected: false }
    ];

    constructor(private router: Router) {

    }

    navigate(route: string) {
        this.router.navigate([route]);
    }

    addNumber(s: string) {
        this.phone_num += s;
    }

    start() {
        this.started = true;
    }
}
