import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: `${environment.prefix}color-picker`,
    loadChildren: './color-picker/color-picker.module#ColorPickerModule',
  },
  {
    path: `${environment.prefix}timer-picker`,
    loadChildren: './timer-picker/timer-picker.module#TimerPickerModule',
  },
  {
    path: `${environment.prefix}scrollspy`,
    loadChildren: './scrollspy/scrollspy.module#ScrollspyModule',
  },
];
