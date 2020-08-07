import { Inject, Injectable } from '@angular/core';
import { COLOR_STRING_FORMAT, ColorFormat, EMPTY_COLOR, USED_COLORS } from './color-picker.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { formatColor, parseColorString } from './color-picker.utils';

@Injectable()
export class MccColorPickerService {
  /**
   * Array of all used colors
   */
  private _usedColors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(USED_COLORS) private usedColors: string[],
    @Inject(COLOR_STRING_FORMAT) private colorStringFormat: ColorFormat
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
}
