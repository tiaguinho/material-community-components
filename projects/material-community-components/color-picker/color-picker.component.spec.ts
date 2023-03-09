import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerService } from './color-picker.service';
import {
  COLOR_STRING_FORMAT,
  DISABLE_SELECTED_COLOR_ICON,
  EMPTY_COLOR,
  ENABLE_ALPHA_SELECTOR,
  SELECTED_COLOR_ICON,
  SELECTED_COLOR_SVG_ICON,
  USED_COLORS
} from './color-picker.types';
import { MccColorPickerOptionComponent } from './color-picker-option.component';

describe('MccColorPickerComponent', () => {
  let comp: MccColorPickerComponent;
  let fixture: ComponentFixture<MccColorPickerComponent>;
  let service: MccColorPickerService;

  let emptyColor: string;

  const colors = ['#FFFFFF', '#000000'];

  // convert rgb to hex
  const toHex = color => {
    const parts = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete parts[0];
    for (let i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i], 10).toString(16);
      if (parts[i].length === 1) {
        parts[i] = '0' + parts[i];
      }
    }
    return '#' + parts.join('').toUpperCase();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        OverlayModule,
        PortalModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [
        MccColorPickerOptionComponent,
        MccColorPickerComponent,
        MccColorPickerCollectionComponent,
        MccColorPickerSelectorComponent
      ],
      providers: [
        MccColorPickerService,
        { provide: ENABLE_ALPHA_SELECTOR, useValue: false },
        { provide: DISABLE_SELECTED_COLOR_ICON, useValue: false },
        { provide: SELECTED_COLOR_ICON, useValue: 'done' },
        { provide: SELECTED_COLOR_SVG_ICON, useValue: null },
        { provide: EMPTY_COLOR, useValue: 'none' },
        { provide: USED_COLORS, useValue: [] },
        { provide: COLOR_STRING_FORMAT, useValue: 'hex' },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    TestBed.overrideComponent(MccColorPickerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    service = TestBed.inject(MccColorPickerService);
    emptyColor = TestBed.inject(EMPTY_COLOR);
    fixture = TestBed.createComponent(MccColorPickerComponent);

    comp = fixture.componentInstance;
    comp.ngOnInit();
    comp.isOpen = true;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should open color-picker', () => {
    const button = fixture.debugElement.query(By.css('.btn-picker'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(comp.isOpen).toBeFalsy();
  });

  it('should change used color label', () => {
    const label = 'My Colors';
    comp.usedColorLabel = label;

    fixture.detectChanges();

    expect(comp.usedColorLabel).toBe(label);
  });

  it('should add used colors', (done: DoneFn) => {
    comp.usedColorStart = colors;
    fixture.detectChanges();

    service.getUsedColors().subscribe(resp => {
      expect(resp.length).toBe(colors.length);
      done();
    });
  });

  it('should not add any color', (done: DoneFn) => {
    comp.usedColorStart = [];
    fixture.detectChanges();

    service.getUsedColors().subscribe(resp => {
      expect(resp.length).toBe(0);
      done();
    });
  });

  it('should reverse the used colors', () => {
    comp.usedColorStart = colors;
    comp.reverseUsedColors = true;
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('.option-color'));

    expect(toHex(buttons[0].styles['backgroundColor'])).toBe(colors[1]);
    expect(toHex(buttons[1].styles['backgroundColor'])).toBe(colors[0]);
  });

  it('should hide empty colors', () => {
    comp.usedColorStart = colors;
    comp.hideEmpty = true;
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    expect(buttons.length).toBe(3);
  });

  it('should hide transparent option', () => {
    comp.usedColorStart = colors;
    comp.hideTransparent = true;
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));
    const colorDiv = buttons[0].query(By.css('.option-color'));

    expect(toHex(colorDiv.styles['backgroundColor'])).toBe(colors[0]);
  });

  it('should hide buttons', () => {
    comp.hideButtons = true;
    fixture.detectChanges();

    const actions = fixture.debugElement.query(By.css('.mcc-color-picker-actions'));
    expect(actions).toBeNull();
  });

  it('should change the height of selector component', () => {
    fixture.detectChanges();

    const selector = fixture.debugElement.query(By.css('mcc-color-picker-selector'));
    const height = parseInt(selector.query(By.css('.mcc-color-picker-selector')).styles['height'], 10);

    comp.colorPickerSelectorHeight = 200;
    fixture.detectChanges();

    const newHeight = parseInt(selector.query(By.css('.mcc-color-picker-selector')).styles['height'], 10);
    expect(newHeight).toBeGreaterThan(height);
  });

  it('should hide color picker selector', () => {
    comp.hideColorPickerSelector = true;
    fixture.detectChanges();

    const selector = fixture.debugElement.query(By.css('mcc-color-picker-selector'));
    expect(selector).toBeNull();
  });

  it('should select first color of colors array', fakeAsync(() => {
    comp.hideTransparent = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    buttons[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    comp.selected.subscribe(selected => {
      expect(selected).toBe(colors[0]);
    });

    comp.confirmSelectedColor();
  }));

  it('should select second color of colors array with hide buttons', (done: DoneFn) => {
    comp.hideTransparent = true;
    comp.hideButtons = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    comp.selected.subscribe(selected => {
      expect(selected).toBe(colors[1]);
      done();
    });

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    comp.backdropClick();
  });

  it('should cancel selected color', (done: DoneFn) => {
    comp.hideTransparent = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    comp.canceled.subscribe(() => {
      expect(comp.selectedColor).toBe(emptyColor);
      done();
    });

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    comp.cancelSelection();
  });

  it('should cancel selected color by clicking on backdrop', (done: DoneFn) => {
    comp.hideTransparent = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    comp.canceled.subscribe(() => {
      expect(comp.selectedColor).toBe(emptyColor);
      done();
    });

    comp.backdropClick();
  });

  it('should keep isOpen state after try toggle', () => {
    comp.disabled = true;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    const initial = comp.isOpen;
    comp.toggle();

    expect(comp.isOpen).toBe(initial);
  });

  it('should hide used colors', () => {
    comp.hideUsedColors = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    const collections = fixture.debugElement.queryAll(By.css('mcc-color-picker-collection'));

    expect(collections.length).toBe(0);
  });
});
