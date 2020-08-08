import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColorStringFormat, EMPTY_COLOR } from './color-picker.types';
import { formatColor, parseColorString } from './color-picker.utils';

@Injectable()
export class MccColorPickerCollectionService {
  /**
   * Hold current selected color
   */
  private _selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('');

  alpha: boolean;

  format: ColorStringFormat;

  constructor(@Inject(EMPTY_COLOR) private emptyColor: string) {}

  /**
   * Change internal selected color
   */
  changeSelectedColor(colorString: string) {
    if (colorString === this.emptyColor) {
      this._selectedColor.next(colorString);
    }

    const color = parseColorString(colorString);

    if (!colorString || !color) {
      return;
    }

    const clrString = formatColor(color, this.format);
    this._selectedColor.next(clrString);
  }

  /**
   * Return internal selected color
   */
  getSelectedColor(): Observable<string> {
    return this._selectedColor.asObservable();
  }
}
