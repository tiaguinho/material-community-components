import { TestBed } from '@angular/core/testing';
import { MccColorPickerService } from './color-picker.service';
import { EMPTY_COLOR } from './color-picker';

describe('MccColorPickerService', () => {

  let service: MccColorPickerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EMPTY_COLOR, useValue: 'none'}]
    });

    const emptyColorToken = TestBed.get(EMPTY_COLOR);
    service = new MccColorPickerService(emptyColorToken);
  });

  it('should add color', (done: DoneFn) => {
    const color = '#FFFFFF';

    service.addColor(color);
    service.getColors().subscribe(colors => {
      expect(colors[0]).toBe(color);
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
