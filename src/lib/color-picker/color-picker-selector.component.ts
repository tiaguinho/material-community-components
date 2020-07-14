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
  private _blockContext: any;

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
  private _alphaContext: any;

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
            Validators.max(256),
            Validators.required,
            Validators.maxLength(3),
          ],
          updateOn: 'blur',
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
      this.textClass = o > 125 ? 'black' : 'white';
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
    this.render.listen(this._block.nativeElement, 'mousedown', e => {
      this._isPressed = true;
      this.changeColor(e);
    });
    this.render.listen(this._block.nativeElement, 'mouseup', () => (this._isPressed = false));
    this.render.listen(this._block.nativeElement, 'mouseout', () => (this._isPressed = false));
    this.render.listen(this._block.nativeElement, 'mousemove', e => this.changeColor(e));
    this._blockContext = this._bc.nativeElement.getContext('2d');
    this._blockContext.rect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    this.render.listen(this._strip.nativeElement, 'mousedown', e => {
      this._isPressed = true;
      this.changeBaseColor(e);
    });
    this.render.listen(this._strip.nativeElement, 'mouseup', () => (this._isPressed = false));
    this.render.listen(this._strip.nativeElement, 'mouseout', () => (this._isPressed = false));
    this.render.listen(this._strip.nativeElement, 'mousemove', e => this.changeBaseColor(e));
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
        this.changeOpacity(e);
      });
      this.render.listen(this._alpha.nativeElement, 'mouseup', () => (this._isPressed = false));
      this.render.listen(this._alpha.nativeElement, 'mouseout', () => (this._isPressed = false));
      this.render.listen(this._alpha.nativeElement, 'mousemove', e => this.changeOpacity(e));
      this._alphaContext = this._alpha.nativeElement.getContext('2d');

      // start empty selector
      this._drawOpacitySelector(null);

      // subscribe to watch changes
      this.rgbForm.valueChanges.subscribe(rgb => {
        this._drawOpacitySelector(rgb);
      });
    }

    this._fillGradient();
  }

  /**
   * Draw alpha selector
   * @param rgb object
   * @private
   */
  private _drawOpacitySelector(rgb) {
    const background = new Image();
    background.src = 'data:image/jpeg;base64,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';
    background.onload = () => {
      // clear canvas
      this._alphaContext.clearRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);

      // draw transparent background image
      this._alphaContext.drawImage(background, 0, 0);

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
  private changeBaseColor(e): void {
    if (this._isPressed) {
      this.render.setStyle(this._sc.nativeElement, 'background-position-y', `${e.offsetY}px`);
      const data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
      this._updateRGBA(data);
      this._fillGradient();
      this.updateValues(data);
    }
  }

  /**
   * Get selected alpha from the canvas
   * @param e MouseEvent
   */
  private changeOpacity(e): void {
    if (this._isPressed) {
      this.render.setStyle(this._ap.nativeElement, 'background-position-y', `${e.offsetY}px`);
      let alpha = '0';
      if (e.offsetY > 0) {
        alpha = ((160 - e.offsetY) / 160).toFixed(2);
      }

      this.rgbForm.controls['A'].setValue(parseFloat(alpha));

      this._updateRGB();
    }
  }

  /**
   * Get selected color from the canvas
   * @param e MouseEvent
   */
  private changeColor(e): void {
    if (this._isPressed) {
      this.render.setStyle(this._bp.nativeElement, 'top', `${e.offsetY - 5}px`);
      this.render.setStyle(this._bp.nativeElement, 'left', `${e.offsetX - 5}px`);

      const data = this._blockContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
      this.updateValues(data);
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
