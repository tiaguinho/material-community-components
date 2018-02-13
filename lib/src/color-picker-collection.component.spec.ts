import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatColorPickerCollectionComponent } from './color-picker-collection.component';

describe('MatColorPickerCollectionComponent', () => {

    let comp: MatColorPickerCollectionComponent;
    let fixture: ComponentFixture<MatColorPickerCollectionComponent>;
    let label: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MatColorPickerCollectionComponent],
        });

        fixture = TestBed.createComponent(MatColorPickerCollectionComponent);
        comp = fixture.componentInstance;

        // screen elements
        label = fixture.debugElement.query(By.css('h3')).nativeElement;

    });

    it('should display original label', () => {
        fixture.detectChanges();
        expect(label.textContent).toContain(comp.label);
    });

    it('should display changed label', () => {
        comp.label = 'Test Label';
        fixture.detectChanges();
        expect(label.textContent).toContain('Test Label');
    });

});
