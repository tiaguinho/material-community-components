import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Inject, Input, OnDestroy, Renderer2, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccColorPickerComponent } from './color-picker.component';
import { COLOR_STRING_FORMAT, ColorFormat, EMPTY_COLOR, ENABLE_ALPHA_SELECTOR, formatColor, parseColorString } from './color-picker';
import { BehaviorSubject, Subscription } from 'rxjs';

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
      multi: true,
    },
  ],
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
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(ENABLE_ALPHA_SELECTOR) public showAlphaSelector: boolean,
    @Inject(COLOR_STRING_FORMAT) private colorStringFormat: ColorFormat
  ) {
    // listen changes onkeyup and update color picker
    renderer.listen(elementRef.nativeElement, 'keyup', (event: KeyboardEvent) => {
      const value: string = event.currentTarget['value'];

      if (event.isTrusted && !value) {
        this.writeValueFromKeyup(this.emptyColor);
      } else {
        const color = parseColorString(value);
        if (event.isTrusted && color) {
          this.writeValueFromKeyup(formatColor(color, this.colorStringFormat));
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
  registerOnTouched(fn: any): void {
  }

  /**
   * called by the forms API when the control status changes to or from "DISABLED"
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}

/**
 * Directive connect an color picker with any input, select or textarea.
 * The color picker will be automatically updated when the value of the origin is
 * changed.
 */
@Directive({
  selector: '[mcc-connected-color-picker], [mccConnectedColorPicker]',
  exportAs: 'mccConnectedColorPicker',
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
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(COLOR_STRING_FORMAT) private colorStringFormat: ColorFormat
  ) {
  }

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

        const clr = formatColor(color, this.colorStringFormat);
        this.colorPicker.updateTmpSelectedColor(clr);
        this.colorPicker.selectedColor = clr;
        this.changeDetectorRef.detectChanges();
      }

    });

    // subscribe to color picker confirmation and set on origin element
    // TODO: changed to on confirm. maybe support on-change mode again?
    this._colorPickerSub = this.colorPicker.selected.subscribe(value =>
      this.origin.writeValueFromColorPicker(value)
    );
  }
}
