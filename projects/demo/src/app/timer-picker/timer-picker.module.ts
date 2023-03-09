import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { RouterModule } from '@angular/router';
import { TimerPickerApiComponent } from './components/timer-picker-api.component';
import { TimerPickerExamplesComponent } from './components/timer-picker-examples.component';
import { TimerPickerComponent } from './timer-picker.component';
import { routes } from './timer-picker.router';
import { MccTimerPickerModule } from 'material-community-components/timer-picker';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MccTimerPickerModule,
  ],
  declarations: [TimerPickerComponent, TimerPickerApiComponent, TimerPickerExamplesComponent],
})
export class TimerPickerModule { }
