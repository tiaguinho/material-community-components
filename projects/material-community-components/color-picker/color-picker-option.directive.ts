import { AfterViewInit, Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { EMPTY_COLOR, MccColorPickerOption} from './color-picker.types';
import { parseColorString } from './color-picker.utils';

/**
 * This directive change the background of the button
 */
@Directive({
  selector: '[mccColorPickerOption], [mcc-color-picker-option]',
  exportAs: 'mccColorPickerOption',
})
export class MccColorPickerOptionDirective implements AfterViewInit {
  /**
   * Receive the color
   */
  @Input('mccColorPickerOption')
  get color(): MccColorPickerOption {
    return this._color;
  }
  set color(value: MccColorPickerOption) {
    this._color = value;
  }
  private _color: MccColorPickerOption;

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
    @Inject(EMPTY_COLOR) private emptyColor: string
  ) {
    this._color = emptyColor;
  }

  ngAfterViewInit() {
    if (this.color) {
      let color: string;
      if (typeof this.color === 'string') {
        color = this.color;
      } else {
        color = this.color.value;
        this.render.setAttribute(this.elementRef.nativeElement, 'aria-label', this.color.text);
      }

      if (parseColorString(color)) {
        // apply the color
        this.render.setStyle(
          this.elementRef.nativeElement,
          'backgroundColor',
          color
        );
      }
    }
  }
}
