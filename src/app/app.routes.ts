import { Routes, RouterModule } from '@angular/router';
import { SimpleComponent } from './simple';
import { AdvancedAppComponent } from './advanced';
import { NoContent } from './errors';


export const ROUTES: Routes = [
  { path: '',      component: SimpleComponent },
  { path: 'complex',  component: AdvancedAppComponent },
  { path: 'complex/:tab_id',  component: AdvancedAppComponent },
  { path: '**',    component: NoContent },
];
