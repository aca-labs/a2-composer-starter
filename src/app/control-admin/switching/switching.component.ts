/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 1:31 PM
* @Email:  alex@yuion.net
* @Filename: switching.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 1:14 PM
*/

import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services';

const COLOURS = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7',
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
];
const CANVAS_SIZE = 1000;

@Component({
  selector: 'switching-ui',
  styleUrls: [ './switching.styles.css' ],
  templateUrl: './switching.template.html'
})
export class SwitchingComponent {
    @Input() system: string = 'sys-B5';
    input_list: any[] = [
        { id: '1', name: 'Input 1'},
        { id: '2', name: 'Input 2'},
        { id: '3', name: 'Input 3'},
    ];

    output_list: any[] = [
        { id: '1', name: 'Output 1'},
        { id: '2', name: 'Output 2'},
        { id: '3', name: 'Output 3'},
    ];
    sources: any = null;
    outputs: any = null;

    line_list: any[] = [];
    first_point: any = null;
    line_cnt: number = 0;
    cntd: boolean[] = [];
    o_bind: any = null;
    s_bind: any = null;
    module: any = null;

    menu: string = 'av';
    bind_to: string = 'video';
    exec: string = 'switch';
    cntr: any = null;
    update_timer: any = null;

    @ViewChild('main') main: ElementRef;
    @ViewChild('canvas') canvas: ElementRef;

    constructor(private app_service: AppService) {
    }

    ngOnInit() {
        let system = this.app_service.Settings.get('system');
        this.system = system && typeof system === 'string' && system !== '' ? system : this.system;
        if(this.update_timer) {
            clearInterval(this.update_timer);
        }
        this.update_timer = setInterval(() => {
            this.updateLines();
        }, 500)
    }

    ngOnDestroy() {
        if(this.update_timer) {
            clearInterval(this.update_timer);
        }
    }

    setMenuItem(item: string) {
        this.menu = item;
            // Set bindings
        this.bind_to = item === 'audio' ? 'audio' : 'video';
            // Set Exec
        this.exec = item === 'audio' ? 'switch_audio' : (item === 'video' ? 'switch_video' : 'switch');
        this.cntr = null;
        this.line_list = [];
        this.line_cnt = 0;
    }

    getBoundValue(out: any ) {
        let cnt: any = {};
        if(out[this.bind_to] || +out[this.bind_to] === 0){
            cnt[out[this.bind_to]] = out.output;
            return cnt;
        } else {
            return null;
        }
    }

    clearOutput(index: number, output: any) {
        this.output_list[index][this.bind_to] = 0;
        this.cntr = null;
    }

    setupLists() {
        setTimeout(() => {
                // Process Sources
            this.input_list = [];
            for(let s in this.sources) {
                let name = this.sources[s].mod ? this.sources[s].mod : 'Input';
                let index = this.sources[s].index ? this.sources[s].index : this.input_list.length+1;
                this.input_list.push({
                    id: s,
                    name: `${name} ${index}`,
                    input: this.sources[s].input
                })
            }
                // Process outputs
            this.output_list = [];
            this.cntd = [];
            for(let o in this.outputs) {
                this.output_list.push({
                    id: o,
                    name: o.split('_').join(' '),
                    output: (this.outputs[o].output instanceof Array ? this.outputs[o].output[0] : this.outputs[o].output),
                    //connected: 0,
                    c_index: -1
                })
                this.cntd.push(false);
            }
        }, 20);
    }

    clearLines() {
        this.line_list = [];
        this.drawLines();
    }

    setConnect(cntr: any) {
        if(this.cntr) {
            if(this.cntr.type === cntr.type && this.cntr.index === cntr.index) {
                this.cntr = null;
            } else if(cntr.type !== this.cntr.type) {
                let out = cntr.type === 'output' ? cntr : this.cntr;
                let inn = cntr.type === 'input' ? cntr : this.cntr;
                this.output_list[out.index][this.bind_to] = +this.input_list[inn.index].input;
                this.output_list[out.index].c_index = inn.index;
                if(this.cntr.type === 'output') {
                    this.cntr = null;
                }
            } else {
                this.cntr = cntr;
            }
        } else {
            this.cntr = cntr;
        }
        this.updateLines();
    }

    updateLines() {
        let old_lines = this.line_list;
        this.line_cnt = 0;
        this.line_list = [];
        for(let i = 0; i < this.output_list.length; i++) {
            let out = this.output_list[i];
            if(out[this.bind_to] && out[this.bind_to] > 0) {
                for(let k = 0; k < this.input_list.length; k++) {
                    if(+this.input_list[k].input === +out[this.bind_to]) {
                        out.c_index = k;
                        break;
                    }
                }
                if(out.c_index < 0) continue;
                let p1 = `aca-switching-input-${out.c_index}`;
                let p2 = `aca-switching-output-${i}`;
                let line = {
                    p1 : { id: p1, type: 'input', index: +out[this.bind_to] },
                    p2 : { id: p2, type: 'output', index: i },
                    id: i
                }
                let lc = this.lineExists(old_lines, p1, p2);
                if(lc >= 0) { line.id = lc; }
                else { this.line_cnt++; }
                this.addLine(line);
            }
        }
        this.drawLines();
    }

    lineExists(lines: any[], l1: string, l2: string) {
        for(let i = 0; i < lines.length; i++) {
            if(lines[i].p1.id === l1 && lines[i].p2.id === l2) {
                return lines[i].id;
            }
        }
        return -1;
    }

    addLine(line: any) {
        this.line_list.push(line);
        this.drawLines();
    }

    removeLine(i: number) {
        let l = this.line_list[i];
        let out = l.p1.type === 'output' ? this.output_list[l.p1.index] : this.output_list[l.p2.index];
        let inn = l.p1.type === 'input' ? this.input_list[l.p1.index] : this.input_list[l.p2.index];
        this.cntd[l.p1.type === 'output' ? l.p1.index : l.p2.index] = false;
        out.mute = out.mute ? false : true;
        this.line_list.splice(i, 1);
    }

    drawLines() {
        let ctx = this.canvas.nativeElement.getContext("2d");
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        for(let i = 0; i < this.line_list.length; i++) {
            this.drawLine(this.line_list[i]);
        }
    }

    drawLine(line: any) {
        if(!this.main) return;
        let p1 = line.p1.id;
        let p2 = line.p2.id;
            // Get Bounding boxes
        let p1_el = document.getElementById(p1);
        let p2_el = document.getElementById(p2);
        if(p1_el && p2_el){
            let p1_bb = p1_el.getBoundingClientRect();
            let p2_bb = p2_el.getBoundingClientRect();
                // Calculate position of points in canvas
            let mbb = this.main.nativeElement.getBoundingClientRect();
            let x_ratio = mbb.width / CANVAS_SIZE;
            let y_ratio = mbb.height / CANVAS_SIZE;
                // Calculate position of point 1
            let p1_x = ((p1_bb.left + p1_bb.width/2) - mbb.left) / x_ratio;
            let p1_y = ((p1_bb.top + p1_bb.height/2) - mbb.top) / y_ratio;
                // Calculate position of point 2
            let p2_x = ((p2_bb.left + p2_bb.width/2) - mbb.left) / x_ratio;
            let p2_y = ((p2_bb.top + p2_bb.height/2) - mbb.top) / y_ratio;
                // Draw line onto the canvas
            let ctx = this.canvas.nativeElement.getContext("2d");

            ctx.lineWidth = (p1_y !== p2_y ? 3 : 5) / y_ratio;
            ctx.beginPath();
            ctx.moveTo(p1_x, p1_y);
            ctx.lineTo(p2_x, p2_y);
            ctx.strokeStyle=COLOURS[line.id%COLOURS.length];
            ctx.stroke();
        }
    }
}
