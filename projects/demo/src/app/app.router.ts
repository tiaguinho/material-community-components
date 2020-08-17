import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'color-picker',
    loadChildren: () => import('./color-picker/color-picker.module').then(m => m.ColorPickerModule),
  },
  {
    path: 'timer-picker',
    loadChildren: () => import('./timer-picker/timer-picker.module').then(m => m.TimerPickerModule),
  },
  {
    path: 'scrollspy',
    loadChildren: () => import('./scrollspy/scrollspy.module').then(m => m.ScrollspyModule),
  },
  {
    path: 'speed-dial',
    loadChildren: () => import('./speed-dial/speed-dial.module').then(m => m.SpeedDialModule),
  },
];
