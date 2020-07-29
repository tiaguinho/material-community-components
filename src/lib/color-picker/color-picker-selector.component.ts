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
import { EMPTY_COLOR, ENABLE_ALPHA_SELECTOR, parseColorString, toHex, toRgba } from './color-picker';
import { tinycolor } from '@thebespokepixel/es-tinycolor';
import type { Instance } from 'tinycolor2';
import { map } from 'rxjs/operators';
import { MccColorPickerService } from './color-picker.service';


interface Coordinates {
  x: number;
  y: number;
}

const INITIAL_COLOR: Instance = tinycolor({r: 255, g: 0, b: 0, a: 1});

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
   * ElemenRef of the main color block
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
  private _bc: ElementRef;
  private _blockContext: CanvasRenderingContext2D;

  /**
   * ElementRef of the color base
   */
  @ViewChild('hueSelector') _hueSelector: ElementRef;
  // hold _strip context
  private _hueSelectorContext: any;

  /**
   * Container of the strip
   */
  @ViewChild('hueContainer')
  set hueContainer(el: ElementRef) {
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
  private _ac: ElementRef;

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
    if (value === this.emptyColor) {
      this.noColor = true;
      // use "EMPTY_COLOR" as real color if it can be parsed as such
      this._selectedColor = parseColorString(this.emptyColor) || INITIAL_COLOR;
    } else {
      const color: Instance = tinycolor(value);
      if (color.isValid()) {
        this._selectedColor = color;
        this.noColor = false;
      }
    }
  }

  private _selectedColor: Instance = INITIAL_COLOR;

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
   * Subject of the current selected color by the user
   */
  private _tmpSelectedColor: BehaviorSubject<Instance> = new BehaviorSubject<Instance>(this._selectedColor);

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
   * Handle color of the form inputs text
   */
  textClass: string = 'black';

  /**
   * Keeps track if the mouse button is pressed
   */
  _isPressed: boolean = false;

  /**
   * Form of the color in hex
   */
  hexForm: FormGroup;

  /**
   * Form and keys of the fields in RGB
   */
  rgbaForm: FormGroup;

  /**
   * Last remembered coordinates in block selector
   */
  latestBlockCoordinates: Coordinates;

  /**
   * True if empty color is selected
   */
  noColor: boolean;

  get selectorWidth(): number {
    return this._selectorWidth;
  }

  private _selectorWidth: number = 240;

  get stripWidth(): number {
    return this._stripWidth;
  }

  private _stripWidth: number = 20;

  get tmpSelectedColor$(): Observable<string> {
    return this._tmpSelectedColor.asObservable().pipe(map(toRgba));
  }

  constructor(
    private formBuilder: FormBuilder,
    private render: Renderer2,
    private colorPickerService: MccColorPickerService,
    @Inject(EMPTY_COLOR) private emptyColor: string,
    @Inject(ENABLE_ALPHA_SELECTOR) public showAlphaSelector: boolean
  ) {
  }

  ngOnInit() {
    // set initial position for selection block
    this.latestBlockCoordinates = {x: this._selectorWidth - 1, y: Math.floor(this._height / 2)};

    // set selectedColor initial value
    this._tmpSelectedColor.next(this._selectedColor);

    this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
      this.textClass = color.isDark() && color.getAlpha() > 0.3 ? 'white' : 'black';
      // right now using hex for non alpha and rgba for alpha colors
      if (this.noColor) {
        this.changeSelectedColor.emit(this.emptyColor);
        this.colorPickerService.changeSelectedColor(this.emptyColor);
      } else if (this.showAlphaSelector) {
        const clr = toRgba(color);
        this.changeSelectedColor.emit(clr);
        this.colorPickerService.changeSelectedColor(clr);
      } else {
        const clr = toHex(color);
        this.changeSelectedColor.emit(clr);
        this.colorPickerService.changeSelectedColor(clr);
      }
    });

    // hex form
    this.hexForm = this.formBuilder.group({
      hexCode: new FormControl(toHex(this._selectedColor), {
        validators: [
          Validators.pattern(/^#[0-9A-Fa-f]{6}$/ig)
        ],
        updateOn: 'change'
      })
    });

    // rgb form
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

    // add alpha input to rgb form
    rgbaGroup['A'] = new FormControl(this._selectedColor.getAlpha(), {
      validators: [
        Validators.min(0),
        Validators.max(1),
        Validators.required
      ]
    });

    this.rgbaForm = this.formBuilder.group(rgbaGroup);

    this._watchFormChanges();
  }

  /**
   * Update forms and selectors selectedColor change and
   * the mouse button is not pressed
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('selectedColor' in changes) {
      if (!this._isPressed) {
        const color = this._selectedColor;
        this._updateHexForm(color);
        this._updateRGBAForm(color);
        this.setSelectorPositions(color);
        if (this._blockContext) {
          this._drawBlockSelector(color);
        }
        if (this._alphaContext && this.showAlphaSelector) {
          this._drawAlphaSelector(color);
        }
        this._tmpSelectedColor.next(color);
      }
    }
  }

  ngOnDestroy() {
    // unsubscribe
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
    // draw initial selectors and listen to mouse events
    this.render.listen(this._block.nativeElement, 'mousedown', (e: MouseEvent) => {
      this._isPressed = true;
      this.onChangeColor({x: e.offsetX, y: e.offsetY});
    });
    this.render.listen(this._block.nativeElement, 'mouseup', () => (this._isPressed = false));
    this.render.listen(this._block.nativeElement, 'mouseout', () => (this._isPressed = false));
    this.render.listen(this._block.nativeElement, 'mouseover', (e: MouseEvent) => {
      this._isPressed = (e.buttons === 1);
    });
    this.render.listen(this._block.nativeElement, 'mousemove', (e: MouseEvent) => this.onChangeColor({x: e.offsetX, y: e.offsetY}));
    this._blockContext = this._bc.nativeElement.getContext('2d');
    this._blockContext.rect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    this.render.listen(this._hueSelector.nativeElement, 'mousedown', (e: MouseEvent) => {
      this._isPressed = true;
      this.onChangeHue(e);
    });
    this.render.listen(this._hueSelector.nativeElement, 'mouseup', () => (this._isPressed = false));
    this.render.listen(this._hueSelector.nativeElement, 'mouseout', () => (this._isPressed = false));
    this.render.listen(this._hueSelector.nativeElement, 'mouseover', (e: MouseEvent) => {
      this._isPressed = (e.buttons === 1);
    });
    this.render.listen(this._hueSelector.nativeElement, 'mousemove', (e: MouseEvent) => this.onChangeHue(e));

    if (this.showAlphaSelector) {
      this._drawAlphaSelector(this._selectedColor);

      this.render.listen(this._alpha.nativeElement, 'mousedown', e => {
        this._isPressed = true;
        this.onChangeAlpha(e);
      });
      this.render.listen(this._alpha.nativeElement, 'mouseup', () => (this._isPressed = false));
      this.render.listen(this._alpha.nativeElement, 'mouseout', () => (this._isPressed = false));
      this.render.listen(this._alpha.nativeElement, 'mouseover', (e: MouseEvent) => {
        this._isPressed = (e.buttons === 1);
      });
      this.render.listen(this._alpha.nativeElement, 'mousemove', (e: MouseEvent) => this.onChangeAlpha(e));
      this._alphaContext = this._alpha.nativeElement.getContext('2d');
    }

    this._drawHueSelector();
    this._drawBlockSelector(this._selectedColor);


    this.setSelectorPositions(this._selectedColor);
  }

  private _drawHueSelector() {
    this._hueSelectorContext = this._hueSelector.nativeElement.getContext('2d');
    this._hueSelectorContext.rect(0, 0, this._hueSelector.nativeElement.width, this._hueSelector.nativeElement.height);

    const grd1 = this._hueSelectorContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
    grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
    this._hueSelectorContext.fillStyle = grd1;
    this._hueSelectorContext.fill();
  }

  /**
   * Generate alpha selector gradient based on the RGB color
   */
  private _drawAlphaSelector(color: Instance) {
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
      alphaGrd2.addColorStop(0, `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b}, 1)`);
      alphaGrd2.addColorStop(1, `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b}, 0)`);

      this._alphaContext.fillStyle = alphaGrd2;
      this._alphaContext.fillRect(0, 0, this._alpha.nativeElement.width, this._alpha.nativeElement.height);
    };
  }

  /**
   * Generate color selector block based on the RGB color
   */
  private _drawBlockSelector(hueColor: Instance) {
    this._blockContext.fillStyle = `hsl(${hueColor.toHsl().h}, 100%, 50%)`;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    // TODO: hsl selector #145
    // const grdLeft = this._hueSelectorContext.createLinearGradient(
    //   0,
    //   0,
    //   this._bc.nativeElement.width,
    //   0
    // );
    // grdLeft.addColorStop(0, 'hsl(0, 0%, 50%)');
    // grdLeft.addColorStop(1, 'hsla(0, 0%, 50%, 0)');
    // this._blockContext.fillStyle = grdLeft;
    // this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
    //
    // const grdTop = this._hueSelectorContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
    // grdTop.addColorStop(0, 'hsl(0, 0%, 100%)');
    // grdTop.addColorStop(0.5, 'hsla(0, 0%, 100%, 0)');
    // grdTop.addColorStop(0.5, 'hsla(0, 0%, 0%, 0)');
    // grdTop.addColorStop(1, 'hsl(0, 0%, 0%)');
    // this._blockContext.fillStyle = grdTop;
    // this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    // HSV selector
    const grdWhite = this._hueSelectorContext.createLinearGradient(0, 0, this._bc.nativeElement.width, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    this._blockContext.fillStyle = grdWhite;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);

    const grdBlack = this._hueSelectorContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    this._blockContext.fillStyle = grdBlack;
    this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
  }

  /**
   * Watch changes on forms
   */
  private _watchFormChanges() {
    this._hexValuesSub = this.hexForm.valueChanges
      .subscribe(value => {
        if (this.hexForm.valid) {
          const color: Instance = tinycolor(value.hexCode);
          this._updateRGBAForm(color);
          this._drawBlockSelector(color);
          if (this.showAlphaSelector) {
            this._drawAlphaSelector(color);
          }
          this.setSelectorPositions(color);
          this._tmpSelectedColor.next(color);
        }
      });

    this._rgbValuesSub = this.rgbaForm.valueChanges.subscribe(rgba => {
      if (this.rgbaForm.valid) {
        const color: Instance = tinycolor({r: rgba.R, g: rgba.G, b: rgba.B, a: rgba.A});
        this._updateHexForm(color);
        this._drawBlockSelector(color);
        if (this.showAlphaSelector) {
          this._drawAlphaSelector(color);
        }
        this.setSelectorPositions(color);
        this._tmpSelectedColor.next(color);
      }
    });
  }

  /**
   * Update RGBA form
   */
  private _updateRGBAForm(color: Instance) {
    if (!this.rgbaForm) {
      return;
    }
    const values = {R: color.toRgb().r, G: color.toRgb().g, B: color.toRgb().b, A: color.toRgb().a};
    this.rgbaForm.setValue(values, {emitEvent: false});
  }

  /**
   * Update hex form
   */
  private _updateHexForm(color: Instance) {
    if (!this.hexForm) {
      return;
    }

    const hex = toHex(color);
    this.hexForm.get('hexCode').setValue(hex, {emitEvent: false});
  }

  /**
   * Handle changes of the hue slider
   */
  private onChangeHue(e: MouseEvent) {
    if (this._isPressed) {
      if (e.offsetX < this._stripWidth && e.offsetY < this.stripHeight) {
        this.setHueSelector(e.offsetY);
        const data = this._hueSelectorContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
        const color: Instance = tinycolor({r: data[0], g: data[1], b: data[2]});
        this._drawBlockSelector(color);
        this.onChangeColor();
      }
    }
  }

  /**
   * Handle changes of the alpha slider
   */
  private onChangeAlpha(e: MouseEvent) {
    if (this._isPressed) {
      this.setAlphaSelector(e.offsetY);
      if (e.offsetY < this.stripHeight) {
        const alpha = Number(((this.stripHeight - e.offsetY) / this.stripHeight).toFixed(2));

        const color = this._selectedColor.setAlpha(alpha);
        this._updateRGBAForm(color);
        this._updateHexForm(color);
        this._tmpSelectedColor.next(color);
        this.noColor = false;
      }
    }
  }

  /**
   * Handle changes of the selected color in the XY block
   */
  private onChangeColor(offsets?: Coordinates) {
    if (this._isPressed) {
      const os = offsets || this.latestBlockCoordinates;
      if (os.x <= this._selectorWidth && os.y <= this._height) {
        this.setXYSelector(os);
        // fixing getting values at border
        const data: Uint8ClampedArray = this._blockContext.getImageData(os.x ? os.x - 1 : os.x, os.y ? os.y - 1 : os.y, 1, 1).data;
        const color: Instance = tinycolor({r: data[0], g: data[1], b: data[2], a: this._selectedColor.getAlpha()});
        this._updateRGBAForm(color);
        this._updateHexForm(color);
        if (this.showAlphaSelector) {
          this._drawAlphaSelector(color);
        }
        this._tmpSelectedColor.next(color);
        this.noColor = false;
      }
    }
  }


  /**
   * Set all selectors positions based on a color
   */
  private setSelectorPositions(color: Instance) {
    const offset = this.getHueOffsets(color);
    this.setHueSelector(offset);

    const offsets = this.getXYOffsets(color);
    this.setXYSelector(offsets);


    const alphaOffset = this.getAlphaOffset(color);
    this.setAlphaSelector(alphaOffset);
  }


  /**
   * Set block selector positions in view
   */
  private setXYSelector(offsets: Coordinates) {
    if (this._bp) {
      this.render.setStyle(this._bp.nativeElement, 'top', `${offsets.y - 5}px`);
      this.render.setStyle(this._bp.nativeElement, 'left', `${offsets.x - 6}px`);
      this.latestBlockCoordinates = offsets;
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


  /**
   * Set alpha selector positions in view
   */
  private setAlphaSelector(offset: number) {
    if (this._ac) {
      this.render.setStyle(this._ac.nativeElement, 'background-position-y', `${offset}px`);
    }
  }

  /**
   * Get the X and Y coordinates for the block selector relative to it's size
   */
  private getXYOffsets(color: Instance): Coordinates {
    const hsv = color.toHsv();

    const x = this._selectorWidth * hsv.s;
    const y = this._height - this._height * hsv.v;
    // const y = this._height - this._height * hsl.l;  // TODO: hsl selector #145
    return {x, y};
  }

  /**
   * Get the Y coordinate for the hue selector relative to it's height
   */
  private getHueOffsets(color: Instance): number {
    return this.stripHeight / 360 * color.toHsl().h;
  }

  /**
   * Get the Y coordinate for the alpha selector relative to it's height
   */
  private getAlphaOffset(color: Instance): number {
    return this.stripHeight - this.stripHeight * color.getAlpha();
  }
}
