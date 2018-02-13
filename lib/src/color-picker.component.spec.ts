import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatColorPickerComponent } from './color-picker.component';

describe('MatColorPickerComponent', () => {

    let comp: MatColorPickerComponent;
    let fixture: ComponentFixture<MatColorPickerComponent>;


    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [MatColorPickerComponent],
        });

        fixture = TestBed.createComponent(MatColorPickerComponent);

        comp = fixture.componentInstance;

    });

});
