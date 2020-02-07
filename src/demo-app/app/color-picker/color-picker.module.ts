import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MccColorPickerModule } from '../../../lib';
import { ColorPickerComponent } from './color-picker.component';
import { routes } from './color-picker.router';
import { ColorPickerApiComponent } from './components/color-picker-api.component';
import { ColorPickerExamplesComponent } from './components/color-picker-examples.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MccColorPickerModule.forRoot({
      used_colors: ['#000000', '#123456', '#777666']
    }),
  ],
  declarations: [ColorPickerComponent, ColorPickerApiComponent, ColorPickerExamplesComponent],
})
export class ColorPickerModule { }
