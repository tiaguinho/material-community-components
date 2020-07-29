import { InjectionToken } from '@angular/core';
import { tinycolor } from '@thebespokepixel/es-tinycolor';


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

/**
 * parses a string-representation of a color with tinycolor - returns "null" when not a valid string
 */
export function parseColorString(colorString: string): tinycolor.Instance | null {
  const color = tinycolor(colorString);
  if (color.isValid()) {
    return color;
  } else {
    return null;
  }
}

/**
 * converts a tinycolor instance to format "#FFFFFF'
 */
export function toHex(color: tinycolor.Instance): string {
  if (!color) {
    return null;
  }
  return color.toString('hex6').toUpperCase();
}

/**
 * converts a tinycolor instance to format "rgb(255,255,255)' when color has alpha value and "rgba(255,255,255,0.5)" when alpha < 1
 */
export function toRgba(color: tinycolor.Instance): string {
  if (!color) {
    return null;
  }
  return color.toString('rgb');
}
