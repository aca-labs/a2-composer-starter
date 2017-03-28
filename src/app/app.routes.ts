/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   24/09/2016 1:46 PM
* @Email:  alex@yuion.net
* @Filename: app.routes.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 23/01/2017 2:09 PM
*/

import { Routes, RouterModule } from '@angular/router';
import { Bootstrapper } from './bootstrap';
import { ControlAdminComponent } from './control-admin';
import { NoContent } from './errors';


export const ROUTES: Routes = [
  { path: '', component: Bootstrapper },
  { path: 'bootstrap', component: Bootstrapper },
  { path: ':system',   redirectTo: ':system/switching' },
  { path: ':system/:tab_id', component: ControlAdminComponent },
];
