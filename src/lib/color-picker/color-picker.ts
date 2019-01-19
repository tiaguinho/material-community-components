import { InjectionToken } from '@angular/core';

/** Contant used as empty color */
export const EMPTY_COLOR = new InjectionToken<string>('empty-color');

/** Constante to set usedColorStart from the module import */
export const USED_COLORS = new InjectionToken<string[]>('used-colors');

/**
 *
 */
export interface ColorPickerConfig {
  empty_color?: string;
  used_colors?: string[];
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

/**
 * Verify if color has # as a first char. If not, add this char
 * to the color
 * @param color string
 */
export function coerceHexaColor(color: string): string {
  if (color && color.indexOf('#') !== 0) {
    color = `#${color}`;
  }

  if (!isValidColor(color)) {
    return;
  }

  return color.toUpperCase();
}

/**
 * Validate if the color is valid
 * @param color string
 */
export function isValidColor(color: string): boolean {
  // validate if color is an hexadecimal
  if (
    !color ||
    color.charAt(0) !== '#' ||
    color.length < 4 ||
    color.length > 7
  ) {
    return false;
  }

  // validate rgb of the color
  return color.replace('#', '')
    .match(/.{1,2}/g)
    .map(v => Number.isNaN(parseInt(v, 16)))
    .indexOf(true) === -1;
}
