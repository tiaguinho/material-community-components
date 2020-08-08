import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  DISABLE_SELECTED_COLOR_ICON,
  EMPTY_COLOR,
  MccColorPickerItem,
  MccColorPickerOption,
  SELECTED_COLOR_ICON,
  SELECTED_COLOR_SVG_ICON
} from './color-picker.types';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MccColorPickerCollectionService } from './color-picker-collection.service';
import { formatColor, parseColorString } from './color-picker.utils';

@Component({
  selector: 'mcc-color-picker-collection',
  templateUrl: './color-picker-collection.component.html',
  styleUrls: ['./color-picker-collection.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MccColorPickerCollectionComponent implements OnInit, AfterContentChecked {
  /**
   * Hide empty slots
   * Empty slots are the difference between the collection size and limit
   */
  @Input()
  set hideEmpty(value: boolean) {
    this._hideEmpty = coerceBooleanProperty(value);
  }

  private _hideEmpty: boolean = false;

  /**
   * Name of the collection
   */
  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  private _label: string;

  /**
   * Array of colors to be displayed
   */
  @Input()
  get colors(): MccColorPickerOption[] {
    return this._colors;
  }

  set colors(values: MccColorPickerOption[]) {
    // TODO: strange bug wher color are not mapped
    // map color string from user to string based on configured format
    const colors: MccColorPickerOption[] = [];
    values.forEach(value => {
      if (typeof value === 'string') {
        const clr = parseColorString(value);
        if (clr) {
          colors.push(formatColor(clr, this.colorPickerCollectionService.format));
        }
      } else {
        const clr = value ? parseColorString(value.value) : null;
        if (clr) {
          colors.push({ value: formatColor(clr, this.colorPickerCollectionService.format), text: value.text });
        }
      }
    });

    this._colors = colors;
  }

  private _colors: MccColorPickerOption[];

  /**
   * Size limit of the collection
   */
  @Input() size: number = 30;

  /**
   * Show transparent option
   */
  @Input() transparent: boolean = false;

  /**
   * Emit selected color value
   */
  @Output() changeColor: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Current selected color
   */
  @Input()
  get selectedColor(): string {
    return this._selectedColor;
  }

  private _selectedColor: string;

  /**
   * Return selected color icon
   */
  get selectedIcon(): string {
    return this._selectedIcon;
  }

  private _selectedIcon: string;

  /**
   * Return selected svg color icon
   */
  get selectedSvgIcon(): string {
    return this._selectedSvgIcon;
  }

  private _selectedSvgIcon: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private colorPickerCollectionService: MccColorPickerCollectionService,
    @Inject(EMPTY_COLOR) public emptyColor: string,
    @Inject(SELECTED_COLOR_ICON) private selectedColorIcon: string,
    @Inject(SELECTED_COLOR_SVG_ICON) public selectedColorSvgIcon: string,
    @Inject(DISABLE_SELECTED_COLOR_ICON) public disableSelectedIcon: boolean
  ) {}

  ngOnInit() {
    // get current selected color
    this.colorPickerCollectionService.getSelectedColor().subscribe(color => {
      this._selectedColor = color;
      this.changeDetectorRef.detectChanges();
    });

    // remove selected color icon when svg icon is defined
    if (!this.selectedColorSvgIcon) {
      this._selectedIcon = this.selectedColorIcon;
    } else {
      this._selectedSvgIcon = this.selectedColorSvgIcon;
    }
  }

  ngAfterContentChecked() {
    if (this._colors && this._colors.length !== this.size) {
      this._colors = this._colors.slice(0, this.size).concat(new Array(this._getCollectionDiffSize()));
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Return the difference between the limit and the collection size.
   * Always return 0 when hideEmpty is true
   */
  private _getCollectionDiffSize(): number {
    if (this._colors.length > this.size || this._hideEmpty) {
      return 0;
    }

    return this.size - this._colors.length;
  }

  /**
   * Remove color
   */
  setTransparent(): void {
    this.changeColor.emit(this.emptyColor);
  }

  /**
   * Emit selected color value
   */
  setColor(option: MccColorPickerOption) {
    const color = typeof option === 'string' ? option : option.value;

    this.colorPickerCollectionService.changeSelectedColor(color);
    this.changeColor.emit(color);
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
      return this._selectedColor === color;
    } else {
      return this._selectedColor === color.value;
    }
  }
}
