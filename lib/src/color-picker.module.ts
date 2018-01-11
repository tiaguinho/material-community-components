import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule
} from '@angular/material';

import { MatColorPickerService } from './color-picker.service';

import { MatColorPickerComponent } from './color-picker.component';
import { MatColorPickerSelectorComponent } from './color-picker-selector.component';
import {
    MatColorPickerCollectionComponent,
    MatColorPickerOptionDirective
} from './color-picker-collection.component';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatListModule
    ],
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
