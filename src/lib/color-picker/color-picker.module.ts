import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {
  EMPTY_COLOR,
  USED_COLORS,
  SELECTED_COLOR_ICON,
  DISABLE_SELECTED_COLOR_ICON,
  ColorPickerConfig
} from './color-picker';

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
    MatIconModule
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
  providers: [
    MccColorPickerService,
    { provide: DISABLE_SELECTED_COLOR_ICON, useValue: false },
    { provide: SELECTED_COLOR_ICON, useValue: 'done' },
    { provide: EMPTY_COLOR, useValue: 'none' },
    { provide: USED_COLORS, useValue: [] }
  ],
})
export class MccColorPickerModule {
  /**
   *
   */
  static forRoot(config: ColorPickerConfig): ModuleWithProviders<MccColorPickerModule> {
    return {
      ngModule: MccColorPickerModule,
      providers: [
        { provide: DISABLE_SELECTED_COLOR_ICON, useValue: config.disable_selected_icon || false },
        { provide: SELECTED_COLOR_ICON, useValue: config.selected_icon || 'done' },
        { provide: EMPTY_COLOR, useValue: ('empty_color' in config ? config.empty_color : 'none') },
        { provide: USED_COLORS, useValue: config.used_colors || [] }
      ],
    };
  }
}
