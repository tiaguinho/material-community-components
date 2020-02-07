import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerService } from './color-picker.service';
import { 
  MccConnectedColorPickerDirective,
  MccColorPickerOriginDirective,
  MccColorPickerOptionDirective
} from './color-picker.directives';
import { EMPTY_COLOR, USED_COLORS } from './color-picker';

//
@Component({
  selector: 'test-component',
  template: `
    <form novalidate [formGroup]="form">
      <mcc-color-picker #colorPicker mccConnectedColorPicker [mccConnectedColorPickerOrigin]="trigger">
      </mcc-color-picker>

      <input mccColorPickerOrigin #trigger="mccColorPickerOrigin" formControlName="color" />
    </form>
  `
})
class TestComponent implements OnInit {
  form: FormGroup;
  @ViewChild('colorPicker', {static: true}) colorPicker: MccColorPickerComponent;

  constructor(private fb: FormBuilder) {}

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
        MatFormFieldModule,
        ReactiveFormsModule
      ],
      declarations: [
        TestComponent,
        MccColorPickerComponent,
        MccColorPickerSelectorComponent,
        MccColorPickerCollectionComponent,
        MccColorPickerOriginDirective,
        MccColorPickerOptionDirective,
        MccConnectedColorPickerDirective
      ],
      providers: [
        MccColorPickerService,
        { provide: EMPTY_COLOR, useValue: 'none'},
        { provide: USED_COLORS, useValue: [] }
      ]
    });

    service = TestBed.get(MccColorPickerService);
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
