/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   24/09/2016 1:46 PM
* @Email:  alex@yuion.net
* @Filename: app.routes.ts
* @Last modified by:   alex.sorafumo
* @Last modified time: 09/02/2017 1:12 PM
*/

import { Routes, RouterModule } from '@angular/router';
import { SimpleComponent } from './simple';
import { AdvancedComponent } from './advanced';
import { NoContent } from './errors';


export const ROUTES: Routes = [
  { path: '',      component: SimpleComponent },
  { path: 'complex',  component: AdvancedComponent },
  { path: 'complex/:tab_id',  component: AdvancedComponent },
  { path: '**',    component: NoContent },
];
