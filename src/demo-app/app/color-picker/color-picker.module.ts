import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
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
