import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  COLOR_STRING_FORMAT,
  ColorStringFormat,
  EMPTY_COLOR,
  ENABLE_ALPHA_SELECTOR,
  MccColorPickerUsedColorPosition
} from './color-picker.types';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerService } from './color-picker.service';
import { MccColorPickerCollectionService } from './color-picker-collection.service';
import { formatColor, parseColorString } from './color-picker.utils';

@Component({
  selector: 'mcc-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MccColorPickerCollectionService]
})
export class MccColorPickerComponent implements AfterContentInit, OnInit, OnDestroy {
  /**
   * Get all collections
   */
  @ContentChildren(MccColorPickerCollectionComponent)
  _collections: QueryList<MccColorPickerCollectionComponent>;

  /**
   * Disable color-picker of showing up
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  private _disabled: boolean = false;

  /**
   * Change label of the collection UsedColors
   */
  @Input()
  get usedColorLabel(): string {
    return this._usedColorLabel;
  }

  set usedColorLabel(value: string) {
    this._usedColorLabel = value;
  }

  private _usedColorLabel: string = 'Used Colors';

  /**
   * Set initial value for used color
   */
  @Input()
  set usedColorStart(colors: string[]) {
    if (colors && colors.length > 0) {
      for (const color of colors) {
        this.colorPickerService.addColor(color);
      }
    }
  }

  /**
   * Set usedColor to be used in reverse
   */
  @Input()
  set reverseUsedColors(reverse: boolean) {
    this._reverseUsedColor = coerceBooleanProperty(reverse);
  }

  private _reverseUsedColor: boolean = false;

  /**
   * Set position of used colors collection
   */
  @Input()
  get usedColorsPosition(): MccColorPickerUsedColorPosition {
    return this._usedColorsPosition;
  }

  set usedColorsPosition(position: MccColorPickerUsedColorPosition) {
    this._usedColorsPosition = position;
  }

  private _usedColorsPosition: MccColorPickerUsedColorPosition = 'top';

  /**
   * Hide the hexadecimal color forms.
   */
  @Input('hideHexForms')
  get hideHexForms(): boolean {
    return this._hideHexForms;
  }

  set hideHexForms(value: boolean) {
    this._hideHexForms = coerceBooleanProperty(value);
  }

  private _hideHexForms: boolean = false;

  /**
   * Hide empty slots from the collection UsedColors
   */
  @Input('hideEmptyUsedColors')
  get hideEmpty(): boolean {
    return this._hideEmpty;
  }

  set hideEmpty(value: boolean) {
    this._hideEmpty = coerceBooleanProperty(value);
  }

  private _hideEmpty: boolean = false;

  /**
   * Hide transparent option of UsedColors
   */
  @Input('hideTransparentUsedColors')
  get hideTransparent(): boolean {
    return this._hideTransparent;
  }

  set hideTransparent(value: boolean) {
    this._hideTransparent = coerceBooleanProperty(value);
  }

  private _hideTransparent: boolean = false;

  /**
   * Hide UsedColors collection
   */
  @Input('hideUsedColors')
  get hideUsedColors(): boolean {
    return this._hideUsedColors;
  }

  set hideUsedColors(value: boolean) {
    this._hideUsedColors = coerceBooleanProperty(value);
  }

  private _hideUsedColors: boolean = false;

  /**
   * Start with a color selected
   */
  @Input()
  get selectedColor(): string {
    return this._selectedColor;
  }

  set selectedColor(value: string) {
    if (this._selectedColor !== value) {
      this.changeDetectorRef.markForCheck();
    }

    const color = parseColorString(value);

    if (color) {
      this._selectedColor = formatColor(color, this.format);
    } else {
      this._selectedColor = this.emptyColor;
    }
  }

  private _selectedColor: string;

  /**
   * Define if the panel will be initiated open
   */
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    this._isOpen = coerceBooleanProperty(value);
    this.changeDetectorRef.detectChanges();
  }

  private _isOpen: boolean = false;

  /**
   * Define if the panel will show in overlay or not
   */
  @Input()
  get overlay(): boolean {
    return this._overlay;
  }

  set overlay(value: boolean) {
    this._overlay = coerceBooleanProperty(value);
  }

  private _overlay: boolean = true;

  /**
   * Hide the action buttons (cancel/confirm)
   */
  @Input()
  get hideButtons(): boolean {
    return this._hideButtons;
  }

  set hideButtons(value: boolean) {
    this._hideButtons = coerceBooleanProperty(value);
  }

  private _hideButtons: boolean = false;

  /**
   * Define new height for the selector
   */
  @Input()
  get colorPickerSelectorHeight(): number {
    return this._colorPickerSelectorHeight;
  }

  set colorPickerSelectorHeight(height: number) {
    this._colorPickerSelectorHeight = height;
  }

  private _colorPickerSelectorHeight: number = 170;

  /**
   * Hide the color picker selector
   */
  @Input()
  get hideColorPickerSelector(): boolean {
    return this._hideColorPickerSelector;
  }

  set hideColorPickerSelector(value: boolean) {
    this._hideColorPickerSelector = coerceBooleanProperty(value);
  }

  private _hideColorPickerSelector: boolean = false;

  /**
   * Set the size of the used colors
   */
  @Input() usedSizeColors: number = 30;

  /**
   * Change btnCancel label
   */
  @Input() btnCancelLabel: string = 'Cancel';

  /**
   * Change btnConfirm label
   */
  @Input() btnConfirmLabel: string = 'Confirm';

  /**
   * Show alpha selector
   */
  @Input('alpha') set alpha(value: boolean) {
    this._alpha = coerceBooleanProperty(value);
  }
  get alpha(): boolean {
    return this._alpha;
  }
  private _alpha: boolean = false;

  /**
   * Choose color string format
   */
  @Input() format: ColorStringFormat;

  /**
   * Event emitted when user change the selected color (without confirm)
   */
  @Output() readonly change = new EventEmitter<string>();

  /**
   * Event emitted when selected color is confirm
   */
  @Output() readonly selected = new EventEmitter<string>();

  /**
   * Event emitted when is clicked outside of the component
   */
  @Output() readonly clickOut = new EventEmitter<void>();

  /**
   * Event emitted when is clicked outside of the component
   */
  @Output() readonly canceled = new EventEmitter<void>();

  /**
   * Return a Observable with the color the user is picking
   */
  get tmpSelectedColor$(): Observable<string> {
    return this._tmpSelectedColor.asObservable();
  }

  private _tmpSelectedColor: BehaviorSubject<string>;

  /**
   * Observable with all the colors used by the user
   */
  get usedColors$(): Observable<string[]> {
    return this.colorPickerService.getUsedColors().pipe(
      map(colors =>
        colors.map(color => {
          const clr = parseColorString(color);
          if (this._alpha || clr.getAlpha() === 1) {
            return formatColor(clr, this.format);
          }
        })
      ),
      map(colors => (!this._reverseUsedColor ? colors : [...colors].reverse()))
    );
  }

  /**
   * Array of subscriptions from the collections
   */
  private _collectionSubs: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private colorPickerService: MccColorPickerService,
    private colorPickerCollectionService: MccColorPickerCollectionService,
    @Inject(EMPTY_COLOR) public emptyColor: string,
    @Inject(ENABLE_ALPHA_SELECTOR) showAlphaSelector: boolean,
    @Inject(COLOR_STRING_FORMAT) colorStringFormat: ColorStringFormat
  ) {
    this._alpha = showAlphaSelector;
    this.format = colorStringFormat;
  }

  ngOnInit() {
    this.colorPickerCollectionService.alpha = this._alpha;
    this.colorPickerCollectionService.format = this.format;

    if (!this._selectedColor) {
      this._selectedColor = this.emptyColor;
    }

    this._tmpSelectedColor = new BehaviorSubject<string>(this._selectedColor);
  }

  /**
   * Walk throw all collections and subcribe to changes
   */
  ngAfterContentInit() {
    if (this._collections) {
      this._collections.forEach((collection: MccColorPickerCollectionComponent) => {
        const subscription = collection.changeColor.subscribe(color => {
          this.updateTmpSelectedColor(color);
        });

        this._collectionSubs.push(subscription);
      });
    }

    // change selected color on service
    this.selected.subscribe(color => this.colorPickerCollectionService.changeSelectedColor(color));
  }

  /**
   * Destroy all subscriptions
   */
  ngOnDestroy() {
    if (this._collectionSubs) {
      this._collectionSubs.forEach((subscription: Subscription) => {
        if (subscription && !subscription.closed) {
          subscription.unsubscribe();
        }
      });
    }
  }

  /**
   * Update selected color and emit the change
   */
  private _updateSelectedColor() {
    if (this._isOpen || !this.overlay) {
      const color = this._tmpSelectedColor.getValue();
      if (this._selectedColor !== color) {
        this._selectedColor = color;
        this.selected.emit(color);
      } else {
        this.selected.emit(color);
      }
    }
  }

  /**
   * Open/close color picker panel
   */
  toggle() {
    if (!this._disabled) {
      this._isOpen = !this._isOpen;
      if (this._selectedColor !== this.emptyColor) {
        this.colorPickerService.addColor(this._selectedColor);
      }

      this.colorPickerCollectionService.changeSelectedColor(this._selectedColor);
    }
  }

  /**
   * Update selected color, close the panel and notify the user
   */
  backdropClick(): void {
    if (this._hideButtons) {
      this.confirmSelectedColor();
    } else {
      this.cancelSelection();
    }
    this.clickOut.emit();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Update tmpSelectedColor
   * @param color string
   */
  updateTmpSelectedColor(color: string) {
    const clr = parseColorString(color);
    const clrString = color === this.emptyColor ? color : formatColor(clr, this.format);
    this._tmpSelectedColor.next(clrString);
    if (this._selectedColor !== clrString) {
      this.change.emit(clrString);
      if (this._hideButtons) {
        this._updateSelectedColor();
      }
    }
  }

  /**
   * Cancel the selection and close the panel
   */
  cancelSelection() {
    this._tmpSelectedColor.next(this._selectedColor);
    this.colorPickerCollectionService.changeSelectedColor(this.selectedColor);
    this.canceled.emit();
    this.toggle();
  }

  /**
   * Update selectedColor and close the panel
   */
  confirmSelectedColor() {
    this._updateSelectedColor();
    this.toggle();
  }
}
