import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
} from '@angular/material';
import { MccColorPickerModule } from '../../../lib';

import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerApiComponent } from './components/color-picker-api.component';
import { ColorPickerExamplesComponent } from './components/color-picker-examples.component';

import { routes } from './color-picker.router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MccColorPickerModule,
  ],
  declarations: [ColorPickerComponent, ColorPickerApiComponent, ColorPickerExamplesComponent],
})
export class ColorPickerModule {}
