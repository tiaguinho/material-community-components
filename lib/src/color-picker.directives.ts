import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    Renderer2
} from '@angular/core';
import { MatColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
import { Subscription } from 'rxjs/Subscription';

/**
 * This directive change the background of the button
 */
@Directive({
    selector: '[matColorPickerOption], [mat-color-picker-option]',
    exportAs: 'matColorPickerOption'
})
export class MatColorPickerOptionDirective implements AfterViewInit {

    /**
     * Receive the color
     */
    @Input('matColorPickerOption')
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
    exportAs: 'matColorPickerOrigin'
})
export class MatColorPickerOriginDirective {

    /**
     * Reference to the element on which the directive is applied.
     */
    constructor(public elementRef: ElementRef) {
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
    @Input('matConnectedColorPickerOrigin')
    set origin(origin: MatColorPickerOriginDirective) { this._origin = origin.elementRef; }
    private _origin: ElementRef;

    /**
     * Color picker subscription
     */
    private _colorPickerSub: Subscription;

    constructor(
        private colorPicker: MatColorPickerComponent,
        private render: Renderer2
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
    }

    /**
     * Attach color picker and origin
     */
    private _attachColorPicker(): void {
        // listen changes onkeyup and update color picker
        this.render.listen(this._origin.nativeElement, 'keyup', (event: KeyboardEvent) => {
            const value: string = event.currentTarget['value'];
            if (event.isTrusted && isValidColor(value)) {
                this.colorPicker.selectedColor = coerceHexaColor(value);
            } else {
                this.colorPicker.selectedColor = EMPTY_COLOR;
            }
        });

        // subscribe to color picker changes and set on origin element
        this._colorPickerSub = this.colorPicker.change.subscribe(value => {
            this.render.setProperty(this._origin.nativeElement, 'value', value);
        });
    }

}
