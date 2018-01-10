import {
    AfterViewInit,
    Component,
    ChangeDetectionStrategy,
    HostListener,
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

interface RGB {
    r: number;
    g: number;
    b: number;
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

    @ViewChild('colorPickerSelectorValue') preview: ElementRef;

    @Output() changeSelectedColor = new EventEmitter;

    private _selectedColorSub: Subscription;

    private buttonIsPressed: boolean = false;

    private _blockContext: any;

    private _stripContext: any;

    private _rgbaColor: string = 'rgba(255,0,0,1)';

    get selectedColor(): Observable<string> { return this._selectedColor.asObservable(); }
    private _selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('');

    rgb: RGB = { r: 0, g: 0, b: 0};

    constructor(
        private render: Renderer2
    ) {}

    ngOnInit() {
        this._selectedColorSub = this.selectedColor.subscribe(color =>
            this.changeSelectedColor.emit(color)
        );
    }

    ngOnDestroy() {
        if (this._selectedColorSub && !this._selectedColorSub.closed) {
            this._selectedColorSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.render.listen(this._block.nativeElement, 'mousedown', () => this.pressButton());
        this.render.listen(this._block.nativeElement, 'mouseup', () => this.pressButton());
        this.render.listen(this._block.nativeElement, 'mousemove', (e) => this.changeColor(e));
        this._blockContext = this._block.nativeElement.getContext('2d');
        this._blockContext.rect(0, 0,
            this._block.nativeElement.width,
            this._block.nativeElement.height);

        this.render.listen(this._strip.nativeElement, 'mousedown', () => this.pressButton());
        this.render.listen(this._strip.nativeElement, 'mouseup', () => this.pressButton());
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
    private pressButton(): void {
        this.buttonIsPressed = !this.buttonIsPressed;
    }

    /**
     * 
     */
    private _getRgba(data: any): string {
        return `rgba(${data[0]}, ${data[1]}, ${data[2]}, 1)`;
    }

    private _getHex(data: any): string {
        return `${data[0].toString(16)}${data[1].toString(16)}${data[2].toString(16)}`;
    }

    /**
     *
     */
    private changeBaseColor(e): void {
        if (this.buttonIsPressed) {
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
        if (this.buttonIsPressed) {
            const data = this._blockContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this.updateValues(data);
        }
    }

    private updateValues(data: any): void {
        if (data) {
            this.rgb = { r: data[0], g: data[1], b: data[2] };

            this._selectedColor.next(this._getHex(data));
            this.render.setStyle(
                this.preview.nativeElement,
                'background-color',
                this._getRgba(data)
            );
        }
    }

}
