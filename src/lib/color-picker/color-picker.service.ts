import { Inject, Injectable } from '@angular/core';
import { COLOR_STRING_FORMAT, ColorFormat, EMPTY_COLOR, formatColor, parseColorString, USED_COLORS } from './color-picker';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MccColorPickerService {
  /**
   * Array of all used colors
   */
  private _usedColors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * Hold current selected color
   */
  private _selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(USED_COLORS) private usedColors: string[],
    @Inject(COLOR_STRING_FORMAT) public colorStringFormat: ColorFormat
  ) {

    // map color string from user to string based on configured format
    const colors: string[] = [];
    usedColors.forEach(value => {
      const clr = parseColorString(value);
      if (clr) {
        colors.push(formatColor(clr, this.colorStringFormat));
      }
    });
    this._usedColors.next(colors);
  }

  /**
   * Add new color to used colors
   */
  addColor(colorString: string) {
    const color = parseColorString(colorString);

    if (!colorString || !color) {
      return;
    }

    const clrString = formatColor(color, this.colorStringFormat);

    const usedColors = this._usedColors.getValue();
    if (!usedColors.includes(clrString)) {
      usedColors.push(clrString);
      this._usedColors.next(usedColors);
    }
  }

  /**
   * Return Observable of colors
   */
  getColors(): Observable<string[]> {
    return this._usedColors.asObservable();
  }

  /**
   * Reset the array of used colors
   */
  resetUseColors(): void {
    this._usedColors.next([]);
  }

  /**
   * Change internal selected color
   */
  changeSelectedColor(colorString: string) {
    const color = parseColorString(colorString);

    if (!colorString || !color) {
      return;
    }

    const clrString = formatColor(color, this.colorStringFormat);
    this._selectedColor.next(clrString);
  }

  /**
   * Return internal selected color
   */
  getSelectedColor(): Observable<string> {
    return this._selectedColor.asObservable();
  }
}
