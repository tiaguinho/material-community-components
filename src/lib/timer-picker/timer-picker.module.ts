import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material';

import { MccTimerPickerComponent } from './timer-picker.component';
import {
  MccTimerPickerOriginDirective,
  MccConnectedTimerPickerDirective,
} from './timer-picker.directives';

@NgModule({
  imports: [CommonModule, PortalModule, OverlayModule, MatButtonModule],
  declarations: [
    MccTimerPickerComponent,
    MccTimerPickerOriginDirective,
    MccConnectedTimerPickerDirective,
  ],
  exports: [
    MccTimerPickerComponent,
    MccTimerPickerOriginDirective,
    MccConnectedTimerPickerDirective,
  ],
})
export class MccTimerPickerModule { }
