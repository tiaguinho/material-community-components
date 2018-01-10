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
    OnDestroy,
    QueryList
} from "@angular/core";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatColorPickerCollectionComponent } from './color-picker-collection.component';
import { MatColorPickerService } from './color-picker.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'mat-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class MatColorPickerComponent implements AfterContentInit, OnDestroy {

    @ContentChildren(MatColorPickerCollectionComponent)
    _collections: QueryList<MatColorPickerCollectionComponent>;

    @Input()
    get usedColorLabel(): string { return this._usedColorLabel; }
    set usedColorLabel(value: string) { this._usedColorLabel = value; }
    private _usedColorLabel: string = 'Used Colors';

    @Input()
    get selectedColor(): string { return this._selectedColor; }
    set selectedColor(value: string) { this._selectedColor = value; }
    private _selectedColor: string;

    /**
     * 
     */
    @Input()
    get isOpen(): boolean { return this._isOpen;  }
    set isOpen(value: boolean) { this._isOpen = coerceBooleanProperty(value); }
    private _isOpen: boolean = false;

    @Output() change = new EventEmitter;

    private _collectionSubs: Subscription[] = [];

    usedColors$: Observable<string[]>;

    constructor(
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        private colorPickerService: MatColorPickerService
    ) {
        this.usedColors$ = colorPickerService.getColors();
    }

    ngAfterContentInit() {
        if (this._collections) {
            this._collections.forEach((collection: MatColorPickerCollectionComponent) => {
                const subscription = collection.changeColor.subscribe(color => {
                    this._updateSelectedColor(color);
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

    private _updateSelectedColor(color: string): void {
        this._selectedColor = color;
        this.change.emit(color);

        this.changeDetectorRef.markForCheck();
    }

    toggle() {
        if (this._isOpen) {
            this.colorPickerService.addColor(this._selectedColor);
        }

        this.isOpen = !this.isOpen;
    }
}
