import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';

import {
  COLOR_STRING_FORMAT,
  ColorPickerConfig,
  DISABLE_SELECTED_COLOR_ICON,
  EMPTY_COLOR,
  ENABLE_ALPHA_SELECTOR,
  SELECTED_COLOR_ICON,
  SELECTED_COLOR_SVG_ICON,
  USED_COLORS
} from './color-picker.types';

import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerOriginDirective } from './color-picker-origin.directive';
import { MccColorPickerService } from './color-picker.service';
import { MccConnectedColorPickerDirective } from './color-picker-connected.directive';
import { MccColorPickerOptionComponent } from './color-picker-option.component';

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
    MccColorPickerOptionComponent,
    MccColorPickerCollectionComponent
  ],
  exports: [MccColorPickerComponent, MccConnectedColorPickerDirective, MccColorPickerOriginDirective, MccColorPickerCollectionComponent],
  providers: [
    MccColorPickerService,
    { provide: DISABLE_SELECTED_COLOR_ICON, useValue: false },
    { provide: ENABLE_ALPHA_SELECTOR, useValue: false },
    { provide: SELECTED_COLOR_ICON, useValue: 'done' },
    { provide: SELECTED_COLOR_SVG_ICON, useValue: null },
    { provide: EMPTY_COLOR, useValue: 'none' },
    { provide: USED_COLORS, useValue: [] },
    { provide: COLOR_STRING_FORMAT, useValue: 'hex' }
  ]
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
        { provide: ENABLE_ALPHA_SELECTOR, useValue: config.enable_alpha_selector || false },
        { provide: SELECTED_COLOR_ICON, useValue: config.selected_icon || 'done' },
        { provide: SELECTED_COLOR_SVG_ICON, useValue: config.selected_svg_icon || null },
        { provide: EMPTY_COLOR, useValue: 'empty_color' in config ? config.empty_color : 'none' },
        { provide: USED_COLORS, useValue: config.used_colors || [] },
        { provide: COLOR_STRING_FORMAT, useValue: config.color_string_format || 'hex' }
      ]
    };
  }
}
