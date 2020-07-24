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
import { ENABLE_ALPHA_SELECTOR } from './color-picker';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import { map } from 'rxjs/operators';


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
   * Receive selected color from the component
   */
  @Input()
  set selectedColor(value: string) {
    this._selectedColor = tinycolor(value);
  }

  private _selectedColor: tinycolor.Instance;

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
  @Output()
  private readonly changeSelectedColor = new EventEmitter<string>();

  /**
   * RGBA current color
   */
  private _rgbaColor: string = 'rgba(0,0,0,1)';

  /**
   * Subject of the current selected color by the user
   */
  private _tmpSelectedColor: BehaviorSubject<tinycolor.Instance> = new BehaviorSubject<tinycolor.Instance>(this._selectedColor);

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
  rgbaForm: FormGroup;

  /**
   * Last remembered offsets in block
   */
  latestBlockOffsets: Offsets;

  get selectorWidth(): number {
    return this._selectorWidth;
  }

  private _selectorWidth: number = 240;

  get stripWidth(): number {
    return this._stripWidth;
  }

  private _stripWidth: number = 20;

  /**
   * Return alpha value from RGBA
   */
  get alphaValue(): number {
    const value = this.rgbaForm.get('A').value;
    if (value === null) {
      return 1;
    }
    return value;
  }

  get tmpSelectedColor$(): Observable<string> {
    return this._tmpSelectedColor.asObservable().pipe(map(color => color.toString('rgb')));
  }

  constructor(
    private formBuilder: FormBuilder,
    private render: Renderer2,
    @Inject(ENABLE_ALPHA_SELECTOR) public showAlphaSelector: boolean
  ) {
  }

  ngOnInit() {
    this.latestBlockOffsets = {x: this._selectorWidth - 1, y: Math.floor(this._height / 2)};
    // set selectedColor initial value
    this._tmpSelectedColor.next(this._selectedColor);

    this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
      this.textClass = color.isDark() ? 'white' : 'black';
      this.changeSelectedColor.emit(color.toString('rgb')); // or to hex?
    });

    // hex form
    this.hexForm = this.formBuilder.group({
      hexCode: new FormControl(this._selectedColor.toHex().toUpperCase(), {
        validators: [
          Validators.pattern(/^#[0-9A-Fa-f]{6}$/ig)
        ],
        updateOn: 'change'
      })
    });

    // rgb dynamic form
    const rgbKeys = ['R', 'G', 'B'];
    const rgbaGroup: { [key: string]: FormControl } = {};
    const rgb = this._selectedColor.toRgb();
    const rgbValues = [rgb.r, rgb.g, rgb.b, rgb.a];
    rgbKeys.forEach(
      (key, index) =>
        (rgbaGroup[key] = new FormControl(rgbValues[index], {
          validators: [
            Validators.min(0),
            Validators.max(255),
            Validators.required
          ],
          updateOn: 'change'
        }))
    );

    // add input for alpha
    rgbaGroup['A'] = new FormControl(this._selectedColor.getAlpha(), {
      validators: [
        Validators.min(0),
        Validators.max(1),
        Validators.required
      ]
    });


    this.rgbaForm = this.formBuilder.group(rgbaGroup);

    // watch changes on forms
    this._onChanges();
  }

  /**
   * Update RGB, RGBA and Gradient when selectedColor change and
   * the mouse button is pressed
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('selectedColor' in changes) {
      if (!this._isPressed) {
        const color = this._selectedColor;
        this._updateHexForm(color);
        this._updateRGBAForm(color);
        this._updateRGBA(color);
        this.setSelectorPositions(color);
        if (this._blockContext) {
          this._fillGradient();
        }
        this._tmpSelectedColor.next(color);
      }
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
      this._drawAlphaSelector(this._selectedColor);

      // subscribe to watch changes
      this.rgbaForm.valueChanges.subscribe(rgba => {
        const color = tinycolor({r: rgba.R, g: rgba.G, b: rgba.b, a: rgba.A});
        this._drawAlphaSelector(color);
      });
    }

    this._fillGradient();
  }

  /**
   * Draw alpha selector
   * @private
   */
  private _drawAlphaSelector(color: tinycolor.Instance) {
    const background = new Image();
    background.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAITcAACE3ATNYn3oAAACJSURBVChTjZDLDgQREEX9/6fRdvgAJMbSArvpud2ofibmLCqVOHUpbH3gnBNCLAP0xpjD++6gmXiEtfbdazHE2ZNS/psHtNZzj3O+eXg14b1H/VwJIaAyjJ7BdIyxJw9KKayn73u1ZuIRcw+R+Iinl3O+34uKV/fzweZhZ6CUahXAq7XiLiKl9AP878ZgrHOa/QAAAABJRU5ErkJggg==';
    background.onload = () => {
      // clear canvas
      this._alphaContext.clearRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);

      // draw transparent background image
      this._alphaContext.fillStyle = this._alphaContext.createPattern(background, 'repeat');
      this._alphaContext.fillRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);
      // if rgb is set and have at least 3 values set, create linear gradient

      const alphaGrd2 = this._alphaContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
      alphaGrd2.addColorStop(0, `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b})`);
      alphaGrd2.addColorStop(1, `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b}, 0)`);

      this._alphaContext.fillStyle = alphaGrd2;
      this._alphaContext.fillRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);
    };
  }

  /**
   * Generate colors based on the RGBA color
   */
  private _fillGradient(): void {
    this._blockContext.fillStyle = this._rgbaColor;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    const grdLeft = this._stripContext.createLinearGradient(
      0,
      0,
      this._bc.nativeElement.width,
      0
    );
    grdLeft.addColorStop(0, 'hsl(0, 0%, 50%)');
    grdLeft.addColorStop(1, 'hsla(0, 0%, 50%, 0)');
    this._blockContext.fillStyle = grdLeft;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    const grdTop = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
    grdTop.addColorStop(0, 'hsl(0, 0%, 100%)');
    grdTop.addColorStop(0.5, 'hsla(0, 0%, 100%, 0)');
    grdTop.addColorStop(0.5, 'hsla(0, 0%, 0%, 0)');
    grdTop.addColorStop(1, 'hsl(0, 0%, 0%)');
    this._blockContext.fillStyle = grdTop;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

  }

  /**
   * Watch change on forms
   */
  private _onChanges() {
    // validate digited code and update when digitation is finished
    this._hexValuesSub = this.hexForm.valueChanges
      .subscribe(value => {
        if (this.hexForm.valid) {
          const color = tinycolor(value.hexCode);
          this._updateRGBAForm(color);
          this._updateRGBA(color);
          this._fillGradient();
          this.setSelectorPositions(color);
          this._tmpSelectedColor.next(color);
        }
      });

    this._rgbValuesSub = this.rgbaForm.valueChanges.subscribe(rgba => {
      if (this.rgbaForm.valid) {
        const color = tinycolor({r: rgba.R, g: rgba.G, b: rgba.B, a: rgba.A});
        this._updateHexForm(color);
        this._updateRGBA(color);
        this._fillGradient();
        this.setSelectorPositions(color);
        this._tmpSelectedColor.next(color);
      }
    });
  }

  /**
   * Update RGBA color
   */
  private _updateRGBA(color: tinycolor.Instance) {
    this._rgbaColor = color.toString('rgb');
  }

  /**
   * Update RGBA form
   */
  private _updateRGBAForm(color: tinycolor.Instance) {
    if (!this.rgbaForm) {
      return;
    }
    const values = {R: color.toRgb().r, G: color.toRgb().g, B: color.toRgb().b, A: color.toRgb().a};
    this.rgbaForm.setValue(values, {emitEvent: false});
  }

  /**
   * Update hex form
   */
  private _updateHexForm(color: tinycolor.Instance) {
    if (!this.hexForm) {
      return;
    }

    const hex = color.toHex().toUpperCase();
    this.hexForm.get('hexCode').setValue('#' + hex, {emitEvent: false});
  }

  /**
   * Get selected base color from the canvas
   */
  private changeHue(e: MouseEvent) {
    if (this._isPressed) {
      if (e.offsetX < this._stripWidth && e.offsetY < this.stripHeight) {
        this.setHueSelector(e.offsetY);
        const data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
        const color = tinycolor({r: data[0], g: data[1], b: data[2]});
        this._updateRGBA(color);
        this._fillGradient();
        this.changeColor();
      }
    }
  }

  /**
   * Get selected alpha from the canvas
   */
  private changeAlpha(e: MouseEvent) {
    if (this._isPressed) {
      this.render.setStyle(this._ap.nativeElement, 'background-position-y', `${e.offsetY}px`);
      if (e.offsetY < this.stripHeight) {
        const alpha = ((this.stripHeight - e.offsetY) / this.stripHeight).toFixed(2);
        this.rgbaForm.controls['A'].setValue(parseFloat(alpha));
        this._updateRGBAForm(this._selectedColor);
      }

    }
  }

  /**
   * Get selected color from the canvas
   */
  private changeColor(offsets?: Offsets) {
    if (this._isPressed) {
      const os = offsets || this.latestBlockOffsets;
      if (os.x < this._selectorWidth && os.y < this._height) {
        this.setXYSelector(os);
        const data: Uint8ClampedArray = this._blockContext.getImageData(os.x, os.y, 1, 1).data;
        const color = tinycolor({r: data[0], g: data[1], b: data[2]});
        this._updateRGBAForm(color);
        this._updateHexForm(color);
        this._tmpSelectedColor.next(color);
      }
    }
  }


  /**
   * Set XY selector positions in view
   */
  private setSelectorPositions(color: tinycolor.Instance) {
    const offset = this.getHueOffsets(color);
    this.setHueSelector(offset);

    const offsets = this.getXYOffsets(color);
    this.setXYSelector(offsets);
  }


  /**
   * Set XY selector positions in view
   */
  private setXYSelector(offsets: Offsets) {
    if (this._bp) {
      this.render.setStyle(this._bp.nativeElement, 'top', `${offsets.y - 5}px`);
      this.render.setStyle(this._bp.nativeElement, 'left', `${offsets.x - 6}px`);
      this.latestBlockOffsets = offsets;
    }
  }


  /**
   * Set hue selector positions in view
   */
  private setHueSelector(offset: number) {
    if (this._sc) {
      this.render.setStyle(this._sc.nativeElement, 'background-position-y', `${offset}px`);
    }
  }


  private getXYOffsets(color: tinycolor.Instance): Offsets {
    const hsl = color.toHsl();

    const x = this._selectorWidth * hsl.s;
    const y = this._height - this._height * hsl.l;
    return {x, y};
  }

  private getHueOffsets(color: tinycolor.Instance): number {
    return Math.floor(this.stripHeight / 360 * color.toHsl().h);
  }

}
