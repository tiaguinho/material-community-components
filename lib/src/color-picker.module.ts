import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { MatColorPickerService } from './color-picker.service';

import { MatColorPickerComponent } from './color-picker.component';
import { MatColorPickerSelectorComponent } from './color-picker-selector.component';
import {
    MatColorPickerCollectionComponent,
    MatColorPickerOptionDirective
} from './color-picker-collection.component';

@NgModule({
    imports: [CommonModule, OverlayModule, FormsModule],
    declarations: [
        MatColorPickerComponent,
        MatColorPickerSelectorComponent,
        MatColorPickerOptionDirective,
        MatColorPickerCollectionComponent
    ],
    exports: [
        MatColorPickerComponent,
        MatColorPickerCollectionComponent
    ],
    providers: [MatColorPickerService],
})
export class MatColorPickerModule {}
