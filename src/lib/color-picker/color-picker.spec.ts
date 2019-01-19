import { coerceHexaColor, isValidColor } from './color-picker';

describe('ColorPickerFunctions', () => {

  it('should return color with #', () => {
    const color = 'ffffff';
    expect(coerceHexaColor(color)).toBe(`#${color.toUpperCase()}`);
  });

  it('should not be a valid color', () => {
    const color = 'ffZ99c';
    expect(coerceHexaColor(color)).toBeUndefined();
  });

  it('should return invalid color', () => {
    expect(isValidColor('')).toBeFalsy();
  });


});