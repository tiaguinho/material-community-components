import { Inject, Injectable } from '@angular/core';
import { EMPTY_COLOR, USED_COLORS } from './color-picker.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { parseColorString } from './color-picker.utils';

@Injectable()
export class MccColorPickerService {
  /**
   * Array of all used colors
   */
  private _usedColors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(@Inject(EMPTY_COLOR) private emptyColor: string, @Inject(USED_COLORS) private usedColors: string[]) {
    // map color string from user to string based on configured format
    const colors: string[] = [];
    usedColors.forEach(value => {
      const clr = parseColorString(value);
      if (clr) {
        colors.push(value);
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

    const usedColors = this._usedColors.getValue();
    if (!usedColors.includes(colorString)) {
      usedColors.push(colorString);
      this._usedColors.next(usedColors);
    }
  }

  /**
   * Return Observable of colors
   */
  getUsedColors(): Observable<string[]> {
    return this._usedColors.asObservable();
  }

  /**
   * Reset the array of used colors
   */
  resetUsedColors(): void {
    this._usedColors.next([]);
  }
}
