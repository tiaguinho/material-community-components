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
import { BehaviorSubject, Subscription } from 'rxjs';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';

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
  private _tmpSelectedColor: BehaviorSubject<string>;

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

  constructor(
    private formBuilder: FormBuilder,
    private render: Renderer2,
    @Inject(EMPTY_COLOR) private emptyColor: string
  ) {}

  ngOnInit() {
    this._tmpSelectedColor = new BehaviorSubject<string>(this._selectedColor);
    this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
      if (color !== this._selectedColor && isValidColor(color)) {
        if (this.hexForm.get('hexCode').value !== color) {
          this.hexForm.setValue({ hexCode: color });
        }
        this.changeSelectedColor.emit(coerceHexaColor(color) || this.emptyColor);
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
            Validators.minLength(1),
            Validators.maxLength(3),
          ],
          updateOn: 'blur',
        }))
    );
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
        this._updateRGBA();
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

    this._fillGradient();
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
    this._hexValuesSub = this.hexForm.get('hexCode').valueChanges.subscribe(value => {
      if (!this._isPressed && isValidColor(value)) {
        this._tmpSelectedColor.next(coerceHexaColor(value) || this.emptyColor);
      }
    });

    this._rgbValuesSub = this.rgbForm.valueChanges.subscribe(controls => {
      const data: string[] = [];
      for (const key in controls) {
        if (!controls[key] || controls[key] > 255) {
          data.push('');
          continue;
        }

        data.push(controls[key]);
      }

      const hex = this._getHex(data);
      if (hex !== this._selectedColor && hex.length === 7) {
        this._tmpSelectedColor.next(hex);
      }
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
    const hex = this._selectedColor.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return [r, g, b];
  }

  /**
   * Convert RGB value to HEX
   * @param data any
   * @returns string
   */
  private _getHex(data: any): string {
    const hex = new Array(3);
    hex[0] = data[0].toString(16);
    hex[1] = data[1].toString(16);
    hex[2] = data[2].toString(16);

    hex.forEach((val, key) => {
      if (val.length === 1) {
        hex[key] = '0' + hex[key];
      }
    });

    return coerceHexaColor(`${hex[0]}${hex[1]}${hex[2]}`) || this.emptyColor;
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

    this.rgbForm.setValue({ R: data[0], G: data[1], B: data[2] });
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
      this._tmpSelectedColor.next(this._getHex(data));
    }
  }
}
