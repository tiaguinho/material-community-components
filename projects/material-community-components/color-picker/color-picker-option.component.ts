import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import {
  DISABLE_SELECTED_COLOR_ICON,
  EMPTY_COLOR,
  MccColorPickerItem,
  MccColorPickerOption,
  SELECTED_COLOR_ICON,
  SELECTED_COLOR_SVG_ICON
} from './color-picker.types';
import { parseColorString } from './color-picker.utils';

/**
 * This directive change the background of the button
 */
@Component({
  selector: 'mcc-color-picker-option',
  templateUrl: './color-picker-option.component.html',
  styleUrls: ['./color-picker-option.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MccColorPickerOptionComponent {
  /**
   * Receive the color
   */
  @Input()
  get color(): MccColorPickerOption {
    return this._color;
  }
  set color(value: MccColorPickerOption) {
    this._color = value;
  }
  private _color: MccColorPickerOption;

  @Input()
  selectedColor: string;

  @Output() colorSelected: EventEmitter<MccColorPickerOption> = new EventEmitter<MccColorPickerOption>();

  @ViewChild('button') button: ElementRef<HTMLButtonElement>;

  constructor(
    private render: Renderer2,
    @Inject(EMPTY_COLOR) public emptyColor: string,
    @Inject(SELECTED_COLOR_ICON) public selectedColorIcon: string,
    @Inject(SELECTED_COLOR_SVG_ICON) public selectedColorSvgIcon: string,
    @Inject(DISABLE_SELECTED_COLOR_ICON) public disableSelectedIcon: boolean
  ) {
    this._color = emptyColor;
  }

  get ariaLabel(): string {
    if (!this.color) {
      return null;
    }
    let colorName;
    if (typeof this.color === 'string') {
      colorName = this.color;
    } else {
      colorName = this.color.text;
    }

    return colorName;
  }

  get backgroundColor(): string {
    if (!this.color) {
      return null;
    }

    let color;
    if (typeof this.color === 'string') {
      color = this.color;
    } else {
      color = this.color.text;
    }

    if (parseColorString(color)) {
      return color;
    }
  }

  /**
   * returns class for "black" or "white" icon-color on a collection-item
   */
  getIconColorClassForColor(color: string | MccColorPickerItem): string {
    const colorString = typeof color === 'string' ? color : color.value;

    const clr = parseColorString(colorString);
    if (clr) {
      return clr.isDark() && clr.getAlpha() > 0.3 ? 'white' : 'black';
    }
  }

  /**
   * check if a color is the current selected color
   */
  isColorSelected(color: string | MccColorPickerItem): boolean {
    if (!color) {
      return false;
    }
    if (typeof color === 'string') {
      return this.selectedColor === color;
    } else {
      return this.selectedColor === color.value;
    }
  }
}
