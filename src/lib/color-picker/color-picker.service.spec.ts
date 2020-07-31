import { TestBed } from '@angular/core/testing';
import { MccColorPickerService } from './color-picker.service';
import {
  COLOR_STRING_FORMAT,
  DISABLE_SELECTED_COLOR_ICON,
  EMPTY_COLOR,
  ENABLE_ALPHA_SELECTOR,
  SELECTED_COLOR_ICON,
  SELECTED_COLOR_SVG_ICON,
  USED_COLORS
} from './color-picker';

describe('MccColorPickerService', () => {
  const color = '#FFFFFF';
  let service: MccColorPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ENABLE_ALPHA_SELECTOR, useValue: false },
        { provide: DISABLE_SELECTED_COLOR_ICON, useValue: false },
        { provide: SELECTED_COLOR_ICON, useValue: 'done' },
        { provide: SELECTED_COLOR_SVG_ICON, useValue: 'done' },
        { provide: EMPTY_COLOR, useValue: 'none'},
        { provide: USED_COLORS, useValue: []},
        { provide: COLOR_STRING_FORMAT, useValue: 'hex'}
      ]
    });

    const emptyColorToken = TestBed.inject(EMPTY_COLOR);
    const usedColorsToken = TestBed.inject(USED_COLORS);
    const colorStringFormat = TestBed.inject(COLOR_STRING_FORMAT);
    service = new MccColorPickerService(emptyColorToken, usedColorsToken, colorStringFormat);
  });

  it('should add color', (done: DoneFn) => {
    service.addColor(color);
    service.getColors().subscribe(colors => {
      expect(colors[0]).toBe(color);
      done();
    });
  });

  it('should return undefined for the invalid color', (done: DoneFn) => {
    service.addColor(color);
    service.addColor('');
    service.getColors().subscribe(colors => {
      expect(colors.length).toBe(1);
      done();
    });
  });

  it('should not add the color because de color already exists', (done: DoneFn) => {
    service.addColor(color);
    service.addColor(color);
    service.getColors().subscribe(colors => {
      expect(colors.length).toBe(1);
      done();
    });
  });

  it('should reset used colors', (done: DoneFn) => {
    service.resetUseColors();
    service.getColors().subscribe(colors => {
      expect(colors.length).toBe(0);
      done();
    });
  });

});
