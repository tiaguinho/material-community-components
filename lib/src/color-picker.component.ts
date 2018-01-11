import {
    AfterContentInit,
    Component,
    ContentChildren,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    OnInit,
    OnDestroy,
    QueryList
} from "@angular/core";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatColorPickerCollectionComponent } from './color-picker-collection.component';
import { MatColorPickerService } from './color-picker.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'mat-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class MatColorPickerComponent implements AfterContentInit, OnInit, OnDestroy {

    @ContentChildren(MatColorPickerCollectionComponent)
    _collections: QueryList<MatColorPickerCollectionComponent>;

    @Input()
    get usedColorLabel(): string { return this._usedColorLabel; }
    set usedColorLabel(value: string) { this._usedColorLabel = value; }
    private _usedColorLabel: string = 'Used Colors';

    @Input('hideEmptyUsedColors')
    get hideEmpty(): boolean { return this._hideEmpty; }
    set hideEmpty(value: boolean) { this._hideEmpty = coerceBooleanProperty(value); }
    private _hideEmpty: boolean = false;

    @Input()
    get selectedColor(): string { return this._selectedColor; }
    set selectedColor(value: string) { this._selectedColor = value; }
    private _selectedColor: string;

    @Input()
    get isOpen(): boolean { return this._isOpen; }
    set isOpen(value: boolean) { this._isOpen = coerceBooleanProperty(value); }
    private _isOpen: boolean = false;

    @Input()
    get hideButtons(): boolean { return this._hideButtons; }
    set hideButtons(value: boolean) { this._hideButtons = coerceBooleanProperty(value); }
    private _hideButtons: boolean = false;

    @Input() btnCancel: string = 'Cancel';

    @Input() btnConfirm: string = 'Confirm';

    @Output() change = new EventEmitter;

    get tmpSelectedColor$(): Observable<string> { return this._tmpSelectedColor.asObservable(); }
    private _tmpSelectedColor: BehaviorSubject<string>;

    private _collectionSubs: Subscription[] = [];

    usedColors$: Observable<string[]>;

    constructor(
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        private colorPickerService: MatColorPickerService
    ) {
        this.usedColors$ = colorPickerService.getColors();
    }

    ngOnInit() {
        this._tmpSelectedColor = new BehaviorSubject<string>(this._selectedColor);
    }

    ngAfterContentInit() {
        if (this._collections) {
            this._collections.forEach((collection: MatColorPickerCollectionComponent) => {
                const subscription = collection.changeColor.subscribe(color => {
                    this.updateTmpSelectedColor(color);
                });

                this._collectionSubs.push(subscription);
            });
        }
    }

    ngOnDestroy() {
        if (this._collectionSubs) {
            this._collectionSubs.forEach((subscription: Subscription) => {
                if (subscription && !subscription.closed) {
                    subscription.unsubscribe();
                }
            });
        }
    }

    private _updateSelectedColor() {
        if (this._isOpen) {
            this._selectedColor = this._tmpSelectedColor.getValue();
            this.change.emit(this._selectedColor);
        }
    }

    toggle() {
        this._isOpen = !this._isOpen;
        if (!this._isOpen) {
            this.colorPickerService.addColor(this._selectedColor);
        }
    }

    updateTmpSelectedColor(color: string) {
        if (color) {
            this._tmpSelectedColor.next(color);
            if (this._hideButtons) {
                this._updateSelectedColor();
            }
        }
    }


    confirmSelectedColor() {
        this._updateSelectedColor();
        this.toggle();
    }
}
