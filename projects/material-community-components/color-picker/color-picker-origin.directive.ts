import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
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
   * Emit focus event
   */
  hasFocus: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emit changes from the origin
   */
  change: BehaviorSubject<string> = new BehaviorSubject<string>(this.elementRef.nativeElement.value);

  /**
   * Propagate changes to angular
   */
  propagateChanges: (_: any) => {};

  /**
   * Controls if focus of the input opens the color picker dialog
   */
  @Input('mccColorPickerOrigin') openMode: 'openOnFocus' | 'default' | '' = 'default';

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(EMPTY_COLOR) private emptyColor: string) {}

  @HostListener('focus') onFocus() {
    if (this.openMode === 'openOnFocus') {
      this.hasFocus.emit();
    }
  }

  @HostListener('keyup') onKeyup() {
    const value: string = this.elementRef.nativeElement.value;

    if (!value) {
      this.writeValueFromKeyup(this.emptyColor);
    } else {
      const color = parseColorString(value);
      if (color) {
        this.writeValueFromKeyup(value);
      }
    }
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
