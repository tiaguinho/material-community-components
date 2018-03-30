import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  },
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
