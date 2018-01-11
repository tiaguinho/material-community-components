import {
    AfterViewInit,
    AfterContentChecked,
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from "@angular/core";
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
    private _color: string = 'none';

    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) {}

    ngAfterViewInit() {
        if (this.color) {
            // apply the color
            this.render.setStyle(this.el.nativeElement, 'background-color', this.color);
        }
    }

}

@Component({
    selector: 'mat-color-picker-collection',
    templateUrl: './color-picker-collection.component.html',
    styleUrls: ['./color-picker-collection.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatColorPickerCollectionComponent implements AfterContentChecked {

    /**
     * Hide empty slots
     * Empty slots are the difference between the collection size and limit
     */
    @Input()
    set hideEmpty(value: boolean) { this._hideEmpty = coerceBooleanProperty(value); }
    private _hideEmpty: boolean = false;

    /**
     * Name of the collection
     */
    @Input()
    get label(): string { return this._label; }
    set label(value: string) { this._label = value; }
    private _label: string;

    /**
     * Array of colors to be displayed
     */
    @Input()
    get colors(): string[] { return this._colors; }
    set colors(values: string[]) { this._colors = values; }
    private _colors: string[];

    /**
     * Size limit of the collection
     */
    @Input() size: number = 30;

    /**
     * Emit selected color value
     */
    @Output() changeColor = new EventEmitter;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngAfterContentChecked() {
        if (this._colors && this._colors.length !== this.size) {
            this._colors = this._colors.slice(0, this.size).concat(
                new Array(this._getCollectionDiffSize())
            );
            this.changeDetectorRef.markForCheck();
        }
    }

    /**
     * Return the difference between the limit and the collection size.
     * Always return 0 when hideEmpty is true
     * @returns number
     */
    private _getCollectionDiffSize(): number {
        if (this._colors.length > this.size || this._hideEmpty) {
            return 0;
        }

        return this.size - this._colors.length;
    }

    /**
     * Emit selected color value
     * @param value string
     */
    setColor(value: string) {
        this.changeColor.emit(value);
    }

}
