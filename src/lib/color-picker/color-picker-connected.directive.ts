import { AfterViewInit, ChangeDetectorRef, Directive, Inject, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MccColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR } from './color-picker.types';
import { parseColorString } from './color-picker.utils';
import { MccColorPickerOriginDirective } from './color-picker-origin.directive';

/**
 * Directive connect an color picker with any input, select or textarea.
 * The color picker will be automatically updated when the value of the origin is
 * changed.
 */
@Directive({
  selector: '[mcc-connected-color-picker], [mccConnectedColorPicker]',
  exportAs: 'mccConnectedColorPicker'
})
export class MccConnectedColorPickerDirective implements AfterViewInit, OnDestroy {
  /**
   * Origin of the connected color picker
   */
  @Input('mccConnectedColorPickerOrigin') origin: MccColorPickerOriginDirective;

  /**
   * Color picker subscription
   */
  private _colorPickerSub: Subscription;

  /**
   * Origin subscription
   */
  private _originSub: Subscription;

  constructor(
    private colorPicker: MccColorPickerComponent,
    public changeDetectorRef: ChangeDetectorRef,
    @Inject(EMPTY_COLOR) private emptyColor: string
  ) {}

  ngAfterViewInit() {
    if (!this._colorPickerSub) {
      this._attachColorPicker();
    }
  }

  ngOnDestroy() {
    if (this._colorPickerSub && !this._colorPickerSub.closed) {
      this._colorPickerSub.unsubscribe();
    }
    if (this._originSub && !this._originSub.closed) {
      this._originSub.unsubscribe();
    }
  }

  /**
   * Attach color picker and origin
   */
  private _attachColorPicker(): void {
    // subscribe to origin change to update color picker
    this._originSub = this.origin.change.subscribe(value => {
      const color = parseColorString(value);

      if (value === this.emptyColor && this.colorPicker.selectedColor !== this.emptyColor) {
        this.colorPicker.updateTmpSelectedColor(value);
      } else if (color) {
        this.colorPicker.updateTmpSelectedColor(value);
        this.colorPicker.selectedColor = value;
        this.changeDetectorRef.detectChanges();
      }
    });

    // subscribe to color picker confirmation and set on origin element
    // TODO: changed to on confirm. maybe support on-change mode again?
    this._colorPickerSub = this.colorPicker.selected.subscribe(value => this.origin.writeValueFromColorPicker(value));
  }
}
