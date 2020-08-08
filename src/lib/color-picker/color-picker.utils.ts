import { Color, ColorStringFormat } from './color-picker.types';
import { TinyColor } from '@thebespokepixel/es-tinycolor';

/**
 * parses a string-representation of a color with tinycolor - returns "null" when not a valid string
 */
export function parseColorString(colorString: string): Color | null {
  const color: Color = new TinyColor(colorString);
  if (color.isValid()) {
    return color;
  } else {
    return null;
  }
}

/**
 * converts a TinyColor instance to format "#FFFFFF' or "#FFFFFFFF" with alpha < 1
 */
export function toHex(color: Color): string {
  if (!color) {
    return null;
  }

  if (color.getAlpha() < 1) {
    return color.toHex8String().toUpperCase();
  } else {
    return color.toHexString().toUpperCase();
  }
}

/**
 * converts a TinyColor instance to format "rgb(255, 255, 255)" when color has no alpha value and "rgba(255, 255, 255, 0.5)" when alpha < 1
 */
export function toRgb(color: Color): string {
  if (!color) {
    return null;
  }
  return color.toRgbString();
}

/**
 * converts a TinyColor instance to format "hsl(360, 100%, 100%)" when color has no alpha value and "hsla(360, 100%, 100%, 0.5)" when alpha < 1
 */
export function toHsl(color: Color): string {
  if (!color) {
    return null;
  }
  return color.toHslString();
}

/**
 * converts a TinyColor instance to certain format
 */
export function formatColor(color: Color, format: ColorStringFormat): string {
  switch (format) {
    case 'hex':
      return toHex(color);
    case 'rgb':
      return toRgb(color);
    case 'hsl':
      return toHsl(color);
  }
}
