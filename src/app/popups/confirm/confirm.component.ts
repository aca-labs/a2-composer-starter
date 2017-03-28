/**
* @Author: Alex Sorafumo
* @Date:   03/02/2017 2:40 PM
* @Email:  alex@yuion.net
* @Filename: confirm.component.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 2:45 PM
*/

import { Component, Input } from '@angular/core';

@Component({
    selector: 'confirm-message',
    templateUrl: './confirm.template.html',
    styleUrls: ['./confirm.styles.css']
})
export class ConfirmComponent {
    @Input() entity: any = {};
}
