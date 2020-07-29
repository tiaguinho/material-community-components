import { Inject, Injectable } from '@angular/core';
import { EMPTY_COLOR, parseColorString, toRgba, USED_COLORS } from './color-picker';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MccColorPickerService {
  /**
   * Array of all used colors
   */
  private _colors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * Hold current selected color
   */
  private _selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(USED_COLORS) private usedColors: string[]
  ) {
    this._colors.next(usedColors);
  }

  /**
   * Add new color to used colors
   */
  addColor(colorString: string) {
    const color = toRgba(parseColorString(colorString));

    if (!colorString || !color) {
      return;
    }

    const colors = this._colors.getValue();
    if (!colors.includes(color) && !colors.includes(colorString)) { // checking rgba value and real string to prevent duplicates
      colors.push(colorString);
      this._colors.next(colors);
    }
  }

  /**
   * Return Observable of colors
   */
  getColors(): Observable<string[]> {
    return this._colors.asObservable();
  }

  /**
   * Reset the array of used colors
   */
  resetUseColors(): void {
    this._colors.next([]);
  }

  /**
   * Change internal selected color
   * @param color
   */
  changeSelectedColor(color: string) {
    this._selectedColor.next(color);
  }

  /**
   * Return internal selected color
   */
  getSelectedColor(): Observable<string> {
    return this._selectedColor.asObservable();
  }
}
