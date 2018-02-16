/** Contant used as empty color */
export const EMPTY_COLOR = 'none';

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
  if (!isValidColor(color)) {
    return EMPTY_COLOR;
  }

  if (color.indexOf('#') !== 0) {
    color = `#${color}`;
  }

  return color.toUpperCase();
}

/**
 * Validate if the color is valid
 * @param color string
 */
export function isValidColor(color: string): boolean {
  // validate if color is an hexadecimal
  if (!color || color.length < 6 || color.length > 7) {
    return false;
  }

  // validate rgb of the color
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return false;
  }

  return true;
}
