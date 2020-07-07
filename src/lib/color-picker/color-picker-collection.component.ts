import {
  AfterContentChecked,
  OnInit,
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Inject,
  Output,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {EMPTY_COLOR, MccColorPickerOption, SELECTED_COLOR_ICON} from './color-picker';
import { MccColorPickerService } from './color-picker.service';

@Component({
  selector: 'mcc-color-picker-collection',
  templateUrl: './color-picker-collection.component.html',
  styleUrls: ['./color-picker-collection.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this._colors = values;
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
   * Return selected color
   */
  get selectedColor(): string {
    return this._selectedColor;
  }
  private _selectedColor: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private colorPickerService: MccColorPickerService,
    @Inject(EMPTY_COLOR) public emptyColor: string,
    @Inject(SELECTED_COLOR_ICON) public selectedIcon: string
  ) {}

  ngOnInit() {
    // get current selected color
    this.colorPickerService.getSelectedColor().subscribe(color => {
      this._selectedColor = color;
    });
  }

  ngAfterContentChecked() {
    if (this._colors && this._colors.length !== this.size) {
      this._colors = this._colors
        .slice(0, this.size)
        .concat(new Array(this._getCollectionDiffSize()));
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Return the difference between the limit and the collection size.
   * Always return 0 when hideEmpty is true
   * @returns number
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
   * @param option MccColorPickerOption
   */
  setColor(option: MccColorPickerOption) {
    const color = typeof option === 'string' ? option : option.value;

    this.colorPickerService.changeSelectedColor(color);
    this.changeColor.emit(color);
  }
}
