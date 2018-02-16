import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import { MatColorPickerService } from './color-picker.service';

import { MatColorPickerComponent } from './color-picker.component';
import { MatColorPickerSelectorComponent } from './color-picker-selector.component';
import { MatColorPickerCollectionComponent } from './color-picker-collection.component';
import {
    MatConnectedColorPickerDirective,
    MatColorPickerOriginDirective,
    MatColorPickerOptionDirective
} from './color-picker.directives';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        MatColorPickerComponent,
        MatConnectedColorPickerDirective,
        MatColorPickerSelectorComponent,
        MatColorPickerOriginDirective,
        MatColorPickerOptionDirective,
        MatColorPickerCollectionComponent
    ],
    exports: [
        MatColorPickerComponent,
        MatConnectedColorPickerDirective,
        MatColorPickerOriginDirective,
        MatColorPickerCollectionComponent
    ],
    providers: [MatColorPickerService],
})
export class MatColorPickerModule {}
