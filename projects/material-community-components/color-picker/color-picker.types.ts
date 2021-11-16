import { InjectionToken } from '@angular/core';

/** Contant used as empty color */
export const EMPTY_COLOR = new InjectionToken<string>('empty-color');

/** Constante to set usedColorStart from the module import */
export const USED_COLORS = new InjectionToken<string[]>('used-colors');

/** Customize selected color icon */
export const SELECTED_COLOR_ICON = new InjectionToken<string>('selected-color-icon');

/** Customize selected color svg icon */
export const SELECTED_COLOR_SVG_ICON = new InjectionToken<string>('selected-color-svg-icon');

/** Disable selected color icon */
export const DISABLE_SELECTED_COLOR_ICON = new InjectionToken<boolean>('disable-selected-color-icon');

/** Enable alpha selector **/
export const ENABLE_ALPHA_SELECTOR = new InjectionToken<boolean>('enable-alpha-selector');

/** Format used for color strings **/
export const COLOR_STRING_FORMAT = new InjectionToken<ColorStringFormat>('color-string-format');

/**
 *
 */
export interface ColorPickerConfig {
  empty_color?: string;
  used_colors?: string[];
  selected_icon?: string;
  selected_svg_icon?: string;
  disable_selected_icon?: boolean;
  enable_alpha_selector?: boolean;
  color_string_format?: string;
}

/**
 * This interface represents one color. Using this interface instead simple string
 * will help screen readers, because the text attribute ir set to the aria-label of
 * the option
 */
export interface MccColorPickerItem {
  text: string;
  value: string;
}

export type MccColorPickerOption = string | MccColorPickerItem;

export type MccColorPickerUsedColorPosition = 'top' | 'bottom';

export type ColorStringFormat = 'hex' | 'rgb' | 'hsl';


