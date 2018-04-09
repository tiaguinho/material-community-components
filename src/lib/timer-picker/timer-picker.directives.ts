import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  Output,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccTimerPickerComponent } from './timer-picker.component';
import { Subscription, BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[mccTimerPickerOrigin], [mcc-timer-picker-origin]',
  exportAs: 'mccTimerPickerOrigin',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MccTimerPickerOriginDirective),
      multi: true,
    },
  ],
})
export class MccTimerPickerOriginDirective {
  /**
   * Emit changes from the origin
   */
  @Output() change: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Emit changes from the origin
   */
  @Output() hasFocus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Propagate changes to angular
   */
  propagateChanges: (_: any) => {};

  /**
   * Reference to the element on which the directive is applied.
   */
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    // listen focus
    renderer.listen(elementRef.nativeElement, 'focus', () => this.hasFocus.next(true));
  }

  /**
   * This method will be called by the forms API to write to the view when
   * programmatic (model -> view) changes are requested.
   */
  writeValue(time: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
    this.change.next(time);
    if (this.propagateChanges) {
      this.propagateChanges(time);
    }
  }

  /**
   * This method will be called by the time picker
   */
  writeValueFromTimerPicker(time: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
    this.propagateChanges(time);
  }

  /**
   * This method will be called from origin whe key is up
   */
  writeValueFromKeyup(time: string) {
    this.change.next(time);
    this.propagateChanges(time);
  }

  /**
   * This is called by the forms API on initialization so it can update the
   * form model when values propagate from the view (view -> model).
   * @param fn any
   */
  registerOnChange(fn: any): void {
    this.propagateChanges = fn;
  }

  /**
   * This is called by the forms API on initialization so it can update the form model on blur
   * @param fn any
   */
  registerOnTouched(fn: any): void { }

  /**
   * called by the forms API when the control status changes to or from "DISABLED"
   * @param isDisabled boolean
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}

@Directive({
  selector: '[mccConnectedTimerPicker], [mcc-connected-timer-picker]',
  exportAs: 'mccConnectedTimerPicker',
})
export class MccConnectedTimerPickerDirective implements AfterViewInit, OnDestroy {
  /**
   * origin of the connected timer picker
   */
  @Input('mccConnectedTimerPickerOrigin') origin: MccTimerPickerOriginDirective;

  /**
   * subscription of the origin focus observable
   */
  private _originFocus: Subscription;

  /**
   * subscription of the timer picker selected change
   */
  private _timerPickerSub: Subscription;

  constructor(
    private timerPicker: MccTimerPickerComponent,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.timerPicker.connected = true;
  }

  ngAfterViewInit() {
    if (!this._timerPickerSub) {
      this.timerPicker.trigger = this.origin;
      this._attachTimerPicker();
    }
  }

  ngOnDestroy() {
    if (this._originFocus && !this._originFocus.closed) {
      this._originFocus.unsubscribe();
    }
    if (this._timerPickerSub && !this._timerPickerSub.closed) {
      this._timerPickerSub.unsubscribe();
    }
  }

  /**
   * Attach the timer picker to origin element (input)
   */
  private _attachTimerPicker(): void {
    this._originFocus = this.origin.hasFocus.subscribe(focused => {
      this.timerPicker.focus = 'hour';
      this.timerPicker.isOpen = focused;
      this.changeDetectorRef.detectChanges();
    });

    this._timerPickerSub = this.timerPicker.selected.subscribe(value =>
      this.origin.writeValueFromTimerPicker(value)
    );
  }
}
