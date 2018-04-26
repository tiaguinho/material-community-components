import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatTabsModule,
} from '@angular/material';
import { MccTimerPickerModule } from '../../../lib';

import { TimerPickerComponent } from './timer-picker.component';
import { TimerPickerApiComponent } from './components/timer-picker-api.component';
import { TimerPickerExamplesComponent } from './components/timer-picker-examples.component';

import { routes } from './timer-picker.router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MccTimerPickerModule,
  ],
  declarations: [TimerPickerComponent, TimerPickerApiComponent, TimerPickerExamplesComponent],
})
export class TimerPickerModule {}
