import { Directive, ElementRef, forwardRef, Inject, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_COLOR } from './color-picker.types';
import { BehaviorSubject } from 'rxjs';
import { parseColorString } from './color-picker.utils';

/**
 * Directive applied to an element to make it usable as an origin for an ColorPicker.
 */
@Directive({
  selector: '[mcc-color-picker-origin], [mccColorPickerOrigin]',
  exportAs: 'mccColorPickerOrigin',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MccColorPickerOriginDirective),
      multi: true
    }
  ]
})
export class MccColorPickerOriginDirective implements ControlValueAccessor {
  /**
   * Emit changes from the origin
   */
  change: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Propagate changes to angular
   */
  propagateChanges: (_: any) => {};

  /**
   * Reference to the element on which the directive is applied.
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(EMPTY_COLOR) private emptyColor: string) {
    // listen changes onkeyup and update color picker
    renderer.listen(elementRef.nativeElement, 'keyup', (event: KeyboardEvent) => {
      const value: string = event.currentTarget['value'];

      if (event.isTrusted && !value) {
        this.writeValueFromKeyup(this.emptyColor);
      } else {
        const color = parseColorString(value);
        if (event.isTrusted && color) {
          this.writeValueFromKeyup(value);
        }
      }
    });
  }

  /**
   * This method will be called by the forms API to write to the view when
   * programmatic (model -> view) changes are requested.
   */
  writeValue(color: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
    this.change.next(color);
    if (this.propagateChanges) {
      this.propagateChanges(color);
    }
  }

  /**
   * This method will be called by the color picker
   */
  writeValueFromColorPicker(color: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
    this.propagateChanges(color);
  }

  /**
   * This method will be called from origin whe key is up
   */
  writeValueFromKeyup(color: string) {
    this.change.next(color);
    this.propagateChanges(color);
  }

  /**
   * This is called by the forms API on initialization so it can update the
   * form model when values propagate from the view (view -> model).
   */
  registerOnChange(fn: any): void {
    this.propagateChanges = fn;
  }

  /**
   * This is called by the forms API on initialization so it can update the form model on blur
   */
  registerOnTouched(fn: any): void {}

  /**
   * called by the forms API when the control status changes to or from "DISABLED"
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}
