import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_COLOR, ENABLE_ALPHA_SELECTOR, coerceHexaColor, convertRgbToHex, isValidColor } from './color-picker';

interface ColorOption {
  type: string;
  value: number;
}

interface Offsets {
  x: number;
  y: number;
}

@Component({
  selector: 'mcc-color-picker-selector',
  templateUrl: './color-picker-selector.component.html',
  styleUrls: ['./color-picker-selector.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MccColorPickerSelectorComponent
  implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  /**
   * ElemenRef of the main color
   */
   @ViewChild('block') _block: ElementRef;

  /**
   * ElemenRef of the pointer main color
   */
  @ViewChild('blockPointer') _bp: ElementRef;

  /**
   * Canvas of the block
   */
  @ViewChild('blockCanvas')
  set blockCursor(el: ElementRef) {
    this._bc = el;
  }
  private _bc: ElementRef;
  private _blockContext: CanvasRenderingContext2D;

  /**
   * ElementRef of the color base
   */
  @ViewChild('strip') _strip: ElementRef;
  // hold _strip context
  private _stripContext: any;

  /**
   * Container of the strip
   */
  @ViewChild('stripContainer')
  set stripCursor(el: ElementRef) {
    this._sc = el;
  }
  private _sc: ElementRef;

  /**
   * ElementRef of the alpha base
   */
  @ViewChild('alpha') _alpha: ElementRef;
  // hold _alpha context
  private _alphaContext: CanvasRenderingContext2D;

  /**
   * Container of the alpha
   */
  @ViewChild('alphaContainer')
  set alphaCursor(el: ElementRef) {
    this._ap = el;
  }
  private _ap: ElementRef;

  /**
   * Change height base of the selector
   */
  @Input('height')
  set height(value: number) {
    this._height = value;
  }
  get selectorHeight(): number {
    return this._height;
  }
  get stripHeight(): number {
    return this._height - 10;
  }
  private _height: number = 170;

  /**
   * Change width of the selector
   */
  @Input('width')
  set width(value: number) {
    this._width = value;
  }
  get selectorWidth(): number {
    return this._width;
  }
  private _width: number = 240;

  /**
   * Change width of the alpha and hue strips
   */
  @Input('stripWidth')
  set stripWidth(value: number) {
    this._stripWidth = value;
  }
  get stripWidth(): number {
    return this._stripWidth;
  }
  private _stripWidth: number = 20;

  /**
   * Receive selected color from the component
   */
  @Input()
  get selectedColor(): string {
    return this._selectedColor;
  }
  set selectedColor(value: string) {
    this._selectedColor = value || this.emptyColor;
  }
  private _selectedColor: string = '';

  /**
   * Hide the hexadecimal color forms.
   */
  @Input('hideHexForms')
  get hideHexForms(): boolean {
    return this._hideHexForms;
  }
  set hideHexForms(value: boolean) {
    this._hideHexForms = value;
  }
  private _hideHexForms: boolean = false;

  /**
   * Emit update when a color is selected
   */
  @Output() changeSelectedColor = new EventEmitter();

  /**
   * RGBA current color
   */
  private _rgbaColor: string = 'rgba(255,0,0,1)';

  /**
   * Subject of the current selected color by the user
   */
  private _tmpSelectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Subscription of the tmpSelectedColor Observable
   */
  private _tmpSelectedColorSub: Subscription;

  /**
   * Subscription of the hexForm values change
   */
  private _hexValuesSub: Subscription;

  /**
   * Subscription of the rbgForm values change
   */
  private _rgbValuesSub: Subscription;

  /**
   * Handle color of the text
   */
  textClass: string = 'black';

  /**
   * Validate if the mouse button is pressed
   */
  _isPressed: boolean = false;

  /**
   * Form of the color in hexa
   */
  hexForm: FormGroup;

  /**
   * Form and keys of the fields in RGB
   */
  rgbKeys = ['R', 'G', 'B'];
  rgbForm: FormGroup;

  /**
   * Last remembered offsets in block
   */
  latestBlockOffsets: Offsets;

  /**
   * Return red color from RGB
   */
  get redColor(): number {
    return this.rgbForm.get('R').value;
  }

  /**
   * Return green color from RGB
   */
  get greenColor(): number {
    return this.rgbForm.get('G').value;
  }

  /**
   * Return blue color from RGB
   */
  get blueColor(): number {
    return this.rgbForm.get('B').value;
  }

  /**
   * Return alpha value from RGBA
   */
  get alphaValue(): number {
    const value = this.rgbForm.get('A').value;
    if (value === null) {
      return 1;
    }
    return value;
  }

  /**
   * Return selected color
   */
  get formColor(): string {
    if (this.showAlphaSelector) {
      return `rgba(${this.redColor}, ${this.greenColor}, ${this.blueColor}, ${this.alphaValue})`;
    }

    return `rgb(${this.redColor}, ${this.greenColor}, ${this.blueColor})`;
  }

  get tmpSelectedColor$(): Observable<string> {
    return this._tmpSelectedColor.asObservable().pipe(map(color => convertRgbToHex(color)));
  }

  constructor(
    private formBuilder: FormBuilder,
    private render: Renderer2,
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(ENABLE_ALPHA_SELECTOR) public showAlphaSelector: boolean
  ) {}

  ngOnInit() {
    this.latestBlockOffsets = { x: this._width - 1, y: 0 };
    // set selectedColor initial value
    this._tmpSelectedColor.next(this._selectedColor);
    this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
      if (this.rgbForm && this.rgbForm.valid) {
        const hexCode = coerceHexaColor(color);
        if (this.hexForm.get('hexCode').value !== hexCode) {
          this.hexForm.setValue({ hexCode });
        }
        this.changeSelectedColor.emit(color || this.emptyColor);
      }
    });

    // hex form
    this.hexForm = this.formBuilder.group({
      hexCode: [this.selectedColor, [Validators.minLength(7), Validators.maxLength(7)]],
    });

    // rgb dynamic form
    const rgbGroup: any = {};
    const rgbValue: number[] = this._getRGB();
    this.rgbKeys.forEach(
      (key, index) =>
        (rgbGroup[key] = new FormControl(rgbValue[index], {
          validators: [
            Validators.min(0),
            Validators.max(255),
            Validators.required,
            Validators.maxLength(3),
          ],
          updateOn: 'change',
        }))
    );

    // add input for alpha
    if (this.showAlphaSelector) {
      rgbGroup['A'] = new FormControl(rgbValue[3], {
        validators: [
          Validators.min(0),
          Validators.max(1),
          Validators.required
        ]
      });
    }

    this.rgbForm = this.formBuilder.group(rgbGroup);

    // watch changes on forms
    this._onChanges();
  }

  /**
   * Update RGB, RGBA and Gradient when selectedColor change and
   * the mouse button is pressed
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('selectedColor' in changes && changes['selectedColor'].currentValue !== this.emptyColor) {
      if (!this._isPressed) {
        this._updateRGB();
        if (this._blockContext) {
          this._fillGradient();
        }
      }

      const rgb = this._getRGB();
      const o = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
      this.textClass = o > 125 ? 'black' : 'white'; // TODO: better algo
    }
  }

  /**
   * Destroy all subscriptions
   */
  ngOnDestroy() {
    if (this._tmpSelectedColorSub && !this._tmpSelectedColorSub.closed) {
      this._tmpSelectedColorSub.unsubscribe();
    }
    if (this._hexValuesSub && !this._hexValuesSub.closed) {
      this._hexValuesSub.unsubscribe();
    }
    if (this._rgbValuesSub && !this._rgbValuesSub.closed) {
      this._rgbValuesSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.render.listen(this._block.nativeElement, 'mousedown', (e: MouseEvent) => {
      this._isPressed = true;
      this.changeColor({x: e.offsetX, y: e.offsetY});
    });
    this.render.listen(this._block.nativeElement, 'mouseup', () => (this._isPressed = false));
    this.render.listen(this._block.nativeElement, 'mouseout', () => (this._isPressed = false));
    this.render.listen(this._block.nativeElement, 'mouseover', (e: MouseEvent) => {
      this._isPressed = (e.buttons === 1);
    });
    this.render.listen(this._block.nativeElement, 'mousemove', (e: MouseEvent) => this.changeColor({x: e.offsetX, y: e.offsetY}));
    this._blockContext = this._bc.nativeElement.getContext('2d');
    this._blockContext.rect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    this.render.listen(this._strip.nativeElement, 'mousedown', (e: MouseEvent) => {
      this._isPressed = true;
      this.changeHue(e);
    });
    this.render.listen(this._strip.nativeElement, 'mouseup', () => (this._isPressed = false));
    this.render.listen(this._strip.nativeElement, 'mouseout', () => (this._isPressed = false));
    this.render.listen(this._strip.nativeElement, 'mouseover', (e: MouseEvent) => {
      this._isPressed = (e.buttons === 1);
    });
    this.render.listen(this._strip.nativeElement, 'mousemove', (e: MouseEvent) => this.changeHue(e));
    this._stripContext = this._strip.nativeElement.getContext('2d');
    this._stripContext.rect(
      0,
      0,
      this._strip.nativeElement.width,
      this._strip.nativeElement.height
    );

    const grd1 = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
    grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
    this._stripContext.fillStyle = grd1;
    this._stripContext.fill();

    // if alpha selector is enabled
    if (this.showAlphaSelector) {
      this.render.listen(this._alpha.nativeElement, 'mousedown', e => {
        this._isPressed = true;
        this.changeAlpha(e);
      });
      this.render.listen(this._alpha.nativeElement, 'mouseup', () => (this._isPressed = false));
      this.render.listen(this._alpha.nativeElement, 'mouseout', () => (this._isPressed = false));
      this.render.listen(this._alpha.nativeElement, 'mouseover', (e: MouseEvent) => {
        this._isPressed = (e.buttons === 1);
      });
      this.render.listen(this._alpha.nativeElement, 'mousemove', (e: MouseEvent) => this.changeAlpha(e));
      this._alphaContext = this._alpha.nativeElement.getContext('2d');

      // start empty selector
      const rgbColor = this._getRGB();
      this._drawAlphaSelector({R: rgbColor[0], G: rgbColor[1], B: rgbColor[2] });

      // subscribe to watch changes
      this.rgbForm.valueChanges.subscribe(rgb => {
        this._drawAlphaSelector(rgb);
      });
    }

    this._fillGradient();
  }

  /**
   * Draw alpha selector
   * @param rgb object
   * @private
   */
  private _drawAlphaSelector(rgb: {R: number, G: number, B: number}) {
    const background = new Image();
    background.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAITcAACE3ATNYn3oAAACJSURBVChTjZDLDgQREEX9/6fRdvgAJMbSArvpud2ofibmLCqVOHUpbH3gnBNCLAP0xpjD++6gmXiEtfbdazHE2ZNS/psHtNZzj3O+eXg14b1H/VwJIaAyjJ7BdIyxJw9KKayn73u1ZuIRcw+R+Iinl3O+34uKV/fzweZhZ6CUahXAq7XiLiKl9AP878ZgrHOa/QAAAABJRU5ErkJggg==';
    background.onload = () => {
      // clear canvas
      this._alphaContext.clearRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);

      // draw transparent background image
     const pattern = this._alphaContext.createPattern(background, 'repeat');

      this._alphaContext.fillStyle = pattern;
      this._alphaContext.fillRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);
      // if rgb is set, create linear gradient
      if (rgb) {
        const alphaGrd2 = this._alphaContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
        alphaGrd2.addColorStop(0, `rgba(${rgb['R']}, ${rgb['G']}, ${rgb['B']})`);
        alphaGrd2.addColorStop(1, `rgba(${rgb['R']}, ${rgb['G']}, ${rgb['B']}, 0)`);

        this._alphaContext.fillStyle = alphaGrd2;
        this._alphaContext.fillRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);
      }
    };
  }

  /**
   * Generate colors based on the RGBA color
   */
  private _fillGradient(): void {
    this._blockContext.fillStyle = this._rgbaColor;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    const grdWhite = this._stripContext.createLinearGradient(0, 0, this._bc.nativeElement.width, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    this._blockContext.fillStyle = grdWhite;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    const grdBlack = this._stripContext.createLinearGradient(
      0,
      0,
      0,
      this._bc.nativeElement.height
    );
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    this._blockContext.fillStyle = grdBlack;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
  }

  /**
   * Watch change on forms
   */
  private _onChanges() {
    // validate digited code and update when digitation is finished
    this._hexValuesSub = this.hexForm.get('hexCode').valueChanges
      .subscribe(value => {
        if (!this._isPressed && isValidColor(value)) {
          this._tmpSelectedColor.next(value || this.emptyColor);
        }
      });

    this._rgbValuesSub = this.rgbForm.valueChanges.subscribe(rgba => {
      const hex = convertRgbToHex(this.formColor);
      if (hex !== convertRgbToHex(this._selectedColor) && isValidColor(hex)) {
        this.hexForm.get('hexCode').setValue(hex);
      }

      this._tmpSelectedColor.next(this.formColor);
    });
  }

  /**
   * Convert HEX/canvas value to rgb
   * @param data any
   * @returns number[]
   */
  private _getRGB(data?: any): number[] {
    if (data) {
      return [data[0], data[1], data[2]];
    }

    if (!this._selectedColor) {
      return [null, null, null];
    }

    const hex = convertRgbToHex(this._selectedColor).replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return [r, g, b];
  }

  /**
   * Update RGBA color
   * @param data any
   */
  private _updateRGBA(data?: any): void {
    if (!this._selectedColor && !data) {
      this._rgbaColor = 'rgba(255,0,0,1)';
    }

    const rgb = this._getRGB(data);
    this._rgbaColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
  }

  /**
   * Update RGB form
   * @param data any
   */
  private _updateRGB(data?: any): void {
    if (!this.rgbForm) {
      return;
    }

    if (!data) {
      data = this._getRGB();
    }

    // define new form value
    const values = { R: data[0], G: data[1], B: data[2]};

    // if alpha is enabled
    if (this.showAlphaSelector) {
      values['A'] = this.alphaValue;
    }

    this.rgbForm.setValue(values);
  }

  /**
   * Get selected base color from the canvas
   * @param e MouseEvent
   */
  private changeHue(e): void {
    if (this._isPressed) {
      if (e.offsetX < this.stripWidth && e.offsetY < this.stripHeight) {
        this.render.setStyle(this._sc.nativeElement, 'background-position-y', `${e.offsetY}px`);
        const data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
        this._updateRGBA(data);
        this._fillGradient();
        this.changeColor();
      }
    }
  }

  /**
   * Get selected alpha from the canvas
   * @param e MouseEvent
   */
  private changeAlpha(e: MouseEvent): void {
    if (this._isPressed) {
      this.render.setStyle(this._ap.nativeElement, 'background-position-y', `${e.offsetY}px`);
      if (e.offsetY < this.stripHeight) {
        const alpha = ((this.stripHeight - e.offsetY) / this.stripHeight).toFixed(2);
        this.rgbForm.controls['A'].setValue(parseFloat(alpha));
        this._updateRGB();
      }

    }
  }

  /**
   * Get selected color from the canvas
   */
  private changeColor(offsets?: Offsets): void {
    if (this._isPressed) {
      const os = offsets || this.latestBlockOffsets;
      if (os.x < this._width && os.y < this._height) {
        this.render.setStyle(this._bp.nativeElement, 'top', `${os.y - 5}px`);
        this.render.setStyle(this._bp.nativeElement, 'left', `${os.x - 6}px`);

        const data = this._blockContext.getImageData(os.x, os.y, 1, 1).data;
        this.updateValues(data);
        this.latestBlockOffsets = os;
      }
    }
  }

  /**
   * Emit update from the selected color
   * @param data any
   */
  private updateValues(data: any): void {
    if (data) {
      this._updateRGB(data);
    }
  }
}
