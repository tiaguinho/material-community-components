import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
} from '@angular/material';
import { MccColorPickerModule } from '../../../lib';

import { ColorPickerComponent } from './color-picker.component';

import { routes } from './color-picker.router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MccColorPickerModule,
  ],
  declarations: [ColorPickerComponent],
})
export class ColorPickerModule {}
