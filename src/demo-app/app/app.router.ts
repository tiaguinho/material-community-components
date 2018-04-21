import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'color-picker',
    loadChildren: './color-picker/color-picker.module#ColorPickerModule',
  },
  {
    path: 'timer-picker',
    loadChildren: './timer-picker/timer-picker.module#TimerPickerModule',
  },
  {
    path: 'scrollspy',
    loadChildren: './scrollspy/scrollspy.module#ScrollspyModule',
  },
];
