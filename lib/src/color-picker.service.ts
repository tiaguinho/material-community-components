import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatColorPickerService {

    /**
     * Array of all used colors
     */
    private _colors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    /**
     * Add new color to used colors
     * @param color string
     */
    addColor(color: string): void {
        if (!color) {
            return;
        }

        const colors = this._colors.getValue();
        if (!colors.find(_color => _color === color)) {
            colors.push(color);
            this._colors.next(colors);
        }
    }

    /**
     * Return Observable of colors
     */
    getColors(): Observable<string[]> {
        return this._colors.asObservable();
    }

}
