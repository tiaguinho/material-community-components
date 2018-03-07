import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
} from '@angular/material';
import { MccTimerPickerModule } from '../../../lib';

import { TimerPickerComponent } from './timer-picker.component';

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
    MccTimerPickerModule,
  ],
  declarations: [TimerPickerComponent],
})
export class TimerPickerModule {}
