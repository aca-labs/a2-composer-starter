/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   24/09/2016 1:46 PM
* @Email:  alex@yuion.net
* @Filename: index.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 01/02/2017 4:49 PM
*/

import { ControlAdminComponent } from './control-admin.component';
import { SwitchingComponent } from './switching';
import { SetupComponent } from './setup';
import { AudioComponent } from './audio';
import { LightingComponent } from './lighting';

export * from './control-admin.component';
export * from './switching';
export * from './audio';

export const APP_COMPONENTS: any[] = [
    ControlAdminComponent,
    SwitchingComponent,
    SetupComponent,
    AudioComponent,
    LightingComponent
]
