import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerOptionDirective } from './color-picker.directives';
import { MccColorPickerService } from './color-picker.service';
import { EMPTY_COLOR, USED_COLORS } from './color-picker';

describe('MccColorPickerComponent', () => {
  let comp: MccColorPickerComponent;
  let fixture: ComponentFixture<MccColorPickerComponent>;
  let service: MccColorPickerService;

  let emptyColor: string;

  const colors = ['#FFFFFF', '#000000'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        OverlayModule,
        PortalModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
      ],
      declarations: [
        MccColorPickerOptionDirective,
        MccColorPickerComponent,
        MccColorPickerCollectionComponent,
        MccColorPickerSelectorComponent
      ],
      providers: [
        MccColorPickerService,
        { provide: EMPTY_COLOR, useValue: 'none' },
        { provide: USED_COLORS, useValue: [] },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    });

    TestBed.overrideComponent(MccColorPickerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    service = TestBed.get(MccColorPickerService);
    emptyColor = TestBed.get(EMPTY_COLOR);
    fixture = TestBed.createComponent(MccColorPickerComponent);

    comp = fixture.componentInstance;
    comp.ngOnInit();
    comp.isOpen = true;
  });

  afterEach(() => { fixture.destroy(); });

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
    comp.usedColorStart = colors
    fixture.detectChanges();

    service.getColors().subscribe(resp => {
      expect(resp.length).toBe(colors.length);
      done();
    });
  });

  it('should not add any color', (done: DoneFn) => {
    comp.usedColorStart = [];
    fixture.detectChanges();
    
    service.getColors().subscribe(resp => {
      expect(resp.length).toBe(0);
      done();
    });
  });

  it('should reverse the used colors', () => {
    comp.usedColorStart = colors;
    comp.reverseUsedColors = true;
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    expect(buttons[1].styles['background']).toBe(colors[1]);
    expect(buttons[2].styles['background']).toBe(colors[0]);
  });

  it('should hide form hex', () => {
    comp.hideHexForms = true;
    fixture.detectChanges();

    const selector = fixture.debugElement.query(By.css('mcc-color-picker-selector'));
    const forms = selector.query(By.css('.mcc-color-picker-selector-preview'));

    expect(forms.children.length).toBe(0);
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

    expect(buttons[0].styles['background']).toBe(colors[0]);
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
    const height = parseInt(selector.query(By.css('.mcc-color-picker-selector')).styles['height']);

    comp.colorPickerSelectorHeight = 200;
    fixture.detectChanges();

    const newHeight = parseInt(selector.query(By.css('.mcc-color-picker-selector')).styles['height']);
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

  it('should select second color of colors array with hide buttons', fakeAsync(() => {
    comp.hideTransparent = true;
    comp.hideButtons = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    comp.selected.subscribe(selected => {
      expect(selected).toBe(colors[1]);
    });

    comp.backdropClick();
  }));

  it('should cancel selected color', fakeAsync(() => {
    comp.hideTransparent = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    const collection = fixture.debugElement.query(By.css('mcc-color-picker-collection'));
    const buttons = collection.queryAll(By.css('button'));

    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    comp.selected.subscribe(selected => {
      expect(selected).toBe(emptyColor);
    });

    comp.cancelSelection();
  }));

  it('should cancel selected color by clicking on backdrop', fakeAsync(() => {
    comp.hideTransparent = true;
    comp.usedColorStart = colors;
    comp.ngAfterContentInit();
    fixture.detectChanges();

    comp.selected.subscribe(selected => {
      expect(selected).toBe(emptyColor);
    });

    comp.backdropClick();
  }));

});
