import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { MccColorPickerService } from './color-picker.service';

import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import {
  MccConnectedColorPickerDirective,
  MccColorPickerOriginDirective,
  MccColorPickerOptionDirective,
} from './color-picker.directives';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    MccColorPickerComponent,
    MccConnectedColorPickerDirective,
    MccColorPickerSelectorComponent,
    MccColorPickerOriginDirective,
    MccColorPickerOptionDirective,
    MccColorPickerCollectionComponent,
  ],
  exports: [
    MccColorPickerComponent,
    MccConnectedColorPickerDirective,
    MccColorPickerOriginDirective,
    MccColorPickerCollectionComponent,
  ],
  providers: [MccColorPickerService],
})
export class MccColorPickerModule {}
