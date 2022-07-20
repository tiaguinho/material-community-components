import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerService } from './color-picker.service';
import { MccColorPickerOriginDirective } from './color-picker-origin.directive';
import {
  COLOR_STRING_FORMAT,
  DISABLE_SELECTED_COLOR_ICON,
  EMPTY_COLOR,
  ENABLE_ALPHA_SELECTOR,
  SELECTED_COLOR_ICON,
  SELECTED_COLOR_SVG_ICON,
  USED_COLORS
} from './color-picker.types';
import { MccConnectedColorPickerDirective } from './color-picker-connected.directive';
import { MccColorPickerOptionComponent } from './color-picker-option.component';

//
@Component({
  selector: 'test-component',
  template: `
    <form novalidate [formGroup]="form">
      <mcc-color-picker #colorPicker mccConnectedColorPicker [mccConnectedColorPickerOrigin]="trigger"> </mcc-color-picker>

      <input mccColorPickerOrigin #trigger="mccColorPickerOrigin" formControlName="color" />
    </form>
  `
})
class TestComponent implements OnInit {
  form: UntypedFormGroup;
  @ViewChild('colorPicker', { static: true }) colorPicker: MccColorPickerComponent;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      color: []
    });
  }
}

describe('MccConnectedColorPickerdirective', () => {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let service: MccColorPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PortalModule,
        OverlayModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ],
      declarations: [
        TestComponent,
        MccColorPickerComponent,
        MccColorPickerSelectorComponent,
        MccColorPickerCollectionComponent,
        MccColorPickerOriginDirective,
        MccColorPickerOptionComponent,
        MccConnectedColorPickerDirective
      ],
      providers: [
        MccColorPickerService,
        { provide: ENABLE_ALPHA_SELECTOR, useValue: false },
        { provide: DISABLE_SELECTED_COLOR_ICON, useValue: false },
        { provide: SELECTED_COLOR_ICON, useValue: 'done' },
        { provide: SELECTED_COLOR_SVG_ICON, useValue: null },
        { provide: EMPTY_COLOR, useValue: 'none' },
        { provide: USED_COLORS, useValue: [] },
        { provide: COLOR_STRING_FORMAT, useValue: 'hex' }
      ]
    });

    service = TestBed.inject(MccColorPickerService);
    fixture = TestBed.createComponent(TestComponent);
    comp = fixture.componentInstance;
  });

  it('should open color-picker', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('click', null);
    fixture.detectChanges();
  });

  it('should write color value', () => {
    comp.ngOnInit();
    fixture.detectChanges();

    const color = comp.form.controls['color'];
    color.setValue('#555333');

    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
  });

  it('should select color', () => {
    comp.ngOnInit();
    comp.colorPicker.usedColorStart = ['#FFFFFF', '#000000'];
    fixture.detectChanges();

    const cp = fixture.debugElement.query(By.css('mcc-color-picker'));
    cp.query(By.css('.btn-picker')).triggerEventHandler('click', null);
    fixture.detectChanges();

    const collection = cp.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    comp.colorPicker.confirmSelectedColor();
    expect(comp.form.controls['color'].value).toBe('#FFFFFF');
  });
});
