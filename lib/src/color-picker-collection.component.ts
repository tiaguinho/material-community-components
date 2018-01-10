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
import { UUID } from 'angular2-uuid';

/**
 *
 */
@Directive({
    selector: '[colorPickerOption]',
})
export class MatColorPickerOptionDirective implements AfterViewInit {

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

    id: string = UUID.UUID();

    @Input() size: number = 30;

    @Input()
    get label(): string { return this._label; }
    set label(value: string) { this._label = value; }
    private _label: string;

    /**
     * Array of colors
     */
    @Input()
    get colors(): string[] { return this._colors; }
    set colors(values: string[]) { this._colors = values; }
    private _colors: string[];

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

    private _getCollectionDiffSize(): number {
        if (this._colors.length > this.size) {
            return 0;
        }

        return this.size - this._colors.length;
    }

    setColor(value: string) {
        this.changeColor.emit(value);
    }

}
