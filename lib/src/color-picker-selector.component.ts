import {
    AfterViewInit,
    Component,
    ChangeDetectionStrategy,
    HostListener,
    Input,
    ElementRef,
    EventEmitter,
    OnInit,
    OnDestroy,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface ColorOption {
    type: string;
    value: number;
}

@Component({
    selector: 'mat-color-picker-selector',
    templateUrl: './color-picker-selector.component.html',
    styleUrls: ['./color-picker-selector.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatColorPickerSelectorComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild('block') _block: ElementRef;

    @ViewChild('strip') _strip: ElementRef;

    @Input()
    get selectedColor(): string { return this._selectedColor; }
    set selectedColor(value: string) {
        this._selectedColor = value || '';

        if (!this._isPressed) {
            this._rgbaColor = this._getRgba();
            if (this._blockContext) {
                this._fillGradient();
            }
        }
    }
    private _selectedColor: string = '';

    @Output() changeSelectedColor = new EventEmitter;

    private _blockContext: any;

    private _stripContext: any;

    private _rgbaColor: string = 'rgba(255,0,0,1)';

    private _tmpSelectedColor: BehaviorSubject<string>;

    private _tmpSelectedColorSub: Subscription;

    _isPressed: boolean = false;

    rgb: ColorOption[] = [
        { type: 'R', value: 0},
        { type: 'G', value: 0},
        { type: 'B', value: 0}
    ];

    constructor(private render: Renderer2) {}

    ngOnInit() {
        this._tmpSelectedColor = new BehaviorSubject<string>(this._selectedColor);
        this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
            if (color !== this._selectedColor) {
                this.changeSelectedColor.emit(color);
            }
        });
    }

    ngOnDestroy() {
        if (this._tmpSelectedColorSub && !this._tmpSelectedColorSub.closed) {
            this._tmpSelectedColorSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.render.listen(this._block.nativeElement, 'mousedown', () => this._isPressed = true);
        this.render.listen(this._block.nativeElement, 'mouseup', () => this._isPressed = false);
        this.render.listen(this._block.nativeElement, 'mouseout', () => this._isPressed = false);
        this.render.listen(this._block.nativeElement, 'mousemove', (e) => this.changeColor(e));
        this._blockContext = this._block.nativeElement.getContext('2d');
        this._blockContext.rect(0, 0,
            this._block.nativeElement.width,
            this._block.nativeElement.height);

        this.render.listen(this._strip.nativeElement, 'mousedown', () => this._isPressed = true);
        this.render.listen(this._strip.nativeElement, 'mouseup', () => this._isPressed = false);
        this.render.listen(this._strip.nativeElement, 'mouseout', () => this._isPressed = false);
        this.render.listen(this._strip.nativeElement, 'mousemove', (e) => this.changeBaseColor(e));
        this._stripContext = this._strip.nativeElement.getContext('2d');
        this._stripContext.rect(0, 0,
            this._strip.nativeElement.width,
            this._strip.nativeElement.height);
        const grd1 = this._stripContext.createLinearGradient(0, 0, 0,
            this._block.nativeElement.height);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this._stripContext.fillStyle = grd1;
        this._stripContext.fill();

        this._fillGradient();
    }

    /**
     *
     */
    private _fillGradient(): void {
        this._blockContext.fillStyle = this._rgbaColor;
        this._blockContext.fillRect(0, 0,
            this._block.nativeElement.width,
            this._block.nativeElement.height);

        const grdWhite = this._stripContext.createLinearGradient(0, 0,
            this._block.nativeElement.width, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this._blockContext.fillStyle = grdWhite;
        this._blockContext.fillRect(0, 0,
            this._block.nativeElement.width,
            this._block.nativeElement.height);

        const grdBlack = this._stripContext.createLinearGradient(0, 0, 0,
            this._block.nativeElement.height);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this._blockContext.fillStyle = grdBlack;
        this._blockContext.fillRect(0, 0,
            this._block.nativeElement.width,
            this._block.nativeElement.height);
    }

    /**
     * 
     */
    private _getRgba(data?: any): string {
        if (!this._selectedColor && !data) {
            return 'rgba(255,0,0,1)';
        }

        if (data) {
            return `rgba(${data[0]}, ${data[1]}, ${data[2]}, 1)`;
        }

        const hex = this._selectedColor.replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        this.rgb = [
            { type: 'R', value: r},
            { type: 'G', value: g},
            { type: 'B', value: b}
        ];

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }

    private _getHex(data: any): string {
        return `#${data[0].toString(16)}${data[1].toString(16)}${data[2].toString(16)}`;
    }

    /**
     *
     */
    private changeBaseColor(e): void {
        if (this._isPressed) {
            const data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this._rgbaColor = this._getRgba(data);
            this._fillGradient();
            this.updateValues(data);
        }
    }

    /**
     *
     */
    private changeColor(e): void {
        if (this._isPressed) {
            const data = this._blockContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this.updateValues(data);
        }
    }

    private updateValues(data: any): void {
        if (data) {
            this.rgb = [
                { type: 'R', value: data[0]},
                { type: 'G', value: data[1]},
                { type: 'B', value: data[2]}
            ];
            this._tmpSelectedColor.next(this._getHex(data));
        }
    }

}
