import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { RouterModule } from '@angular/router';
import { routes } from './color-picker.router';
import { ColorPickerApiComponent } from './components/color-picker-api.component';
import { ColorPickerExamplesComponent } from './components/color-picker-examples.component';
import { MccColorPickerModule } from 'material-community-components/color-picker';
import { ColorPickerComponent } from './color-picker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MccColorPickerModule.forRoot({
      used_colors: ['#000000', '#123456', '#777666'],
      empty_color: ''
    })
  ],
  declarations: [ColorPickerComponent, ColorPickerApiComponent, ColorPickerExamplesComponent]
})
export class ColorPickerModule {}
