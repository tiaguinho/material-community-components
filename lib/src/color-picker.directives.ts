import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

/**
 * This directive change the background of the button
 */
@Directive({
    selector: '[colorPickerOption]',
})
export class MatColorPickerOptionDirective implements AfterViewInit {

    /**
     * Receive the color
     */
    @Input('colorPickerOption')
    get color(): string { return this._color; }
    set color(value: string) { this._color = value; }
    private _color: string = EMPTY_COLOR;

    constructor(
        private elementRef: ElementRef,
        private render: Renderer2
    ) {}

    ngAfterViewInit() {
        if (this.color && isValidColor(this.color)) {
            // apply the color
            this.render.setStyle(this.elementRef.nativeElement, 'background', coerceHexaColor(this.color));
        }
    }

}

/**
 * Directive applied to an element to make it usable as an origin for an ColorPicker.
 */
@Directive({
    selector: '[mat-color-picker-origin], [matColorPickerOrigin]',
    exportAs: 'matColorPickerOrigin',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatColorPickerOriginDirective),
            multi: true
        }
    ]
})
export class MatColorPickerOriginDirective implements ControlValueAccessor {

    /**
     * Emit changes from the origin
     */
    @Output() change: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /**
     * Propagate changes to angular
     */
    propagateChanges: (_: any) => {};

    /**
     * Reference to the element on which the directive is applied.
     */
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        // listen changes onkeyup and update color picker
        renderer.listen(elementRef.nativeElement, 'keyup', (event: KeyboardEvent) => {
            const value: string = event.currentTarget['value'];
            if (event.isTrusted && isValidColor(value)) {
                this.writeValueFromKeyup(coerceHexaColor(value));
            } else {
                this.writeValueFromKeyup(EMPTY_COLOR);
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
     * @param fn any
     */
    registerOnChange(fn: any): void {
        this.propagateChanges = fn;
    }

    /**
     * This is called by the forms API on initialization so it can update the form model on blur
     * @param fn any
     */
    registerOnTouched(fn: any): void {}

    /**
     * called by the forms API when the control status changes to or from "DISABLED"
     * @param isDisabled boolean
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
    selector: '[mat-connected-color-picker], [matConnectedColorPicker]',
    exportAs: 'matConnectedColorPicker'
})
export class MatConnectedColorPickerDirective implements AfterViewInit, OnDestroy {

    /**
     * Origin of the connected color picker
     */
    @Input('matConnectedColorPickerOrigin') origin: MatColorPickerOriginDirective;

    /**
     * Color picker subscription
     */
    private _colorPickerSub: Subscription;

    /**
     * Origin subscription
     */
    private _originSub: Subscription;

    constructor(
        private colorPicker: MatColorPickerComponent,
        public changeDetectorRef: ChangeDetectorRef
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
            this.colorPicker.selectedColor = value;
            this.changeDetectorRef.detectChanges();
        });

        // subscribe to color picker changes and set on origin element
        this._colorPickerSub = this.colorPicker.change.subscribe(value => this.origin.writeValueFromColorPicker(value));
    }

}
