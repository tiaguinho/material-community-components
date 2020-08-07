import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { COLOR_STRING_FORMAT, ColorFormat} from './color-picker.types';
import { formatColor, parseColorString } from './color-picker.utils';


@Injectable()
export class MccColorPickerCollectionService {

  /**
   * Hold current selected color
   */
  private _selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(@Inject(COLOR_STRING_FORMAT) private colorStringFormat: ColorFormat) {
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
