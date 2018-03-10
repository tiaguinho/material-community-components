import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { EMPTY_COLOR, ColorPickerConfig } from './color-picker';

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
    PortalModule,
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
  providers: [MccColorPickerService, { provide: EMPTY_COLOR, useValue: 'none' }],
})
export class MccColorPickerModule {
  /**
   *
   */
  static forRoot(config: ColorPickerConfig): ModuleWithProviders {
    return {
      ngModule: MccColorPickerModule,
      providers: [{ provide: EMPTY_COLOR, useValue: config.empty_color }],
    };
  }
}
