import { TestBed } from '@angular/core/testing';
import { MccColorPickerService } from '../../../src/lib/color-picker/color-picker.service';

describe('MccColorPickerService', () => {

  let service: MccColorPickerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MccColorPickerService]
    });

    service = TestBed.get(MccColorPickerService);
  });

});
