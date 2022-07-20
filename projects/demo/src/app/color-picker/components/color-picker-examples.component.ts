import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MccColorPickerItem, MccColorPickerService } from 'material-community-components/color-picker';

@Component({
  selector: 'app-color-picker-examples',
  templateUrl: './color-picker-examples.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerExamplesComponent implements OnInit {
  selectedColor: string;

  changeColor: string;

  hexForm: UntypedFormGroup;
  rgbForm: UntypedFormGroup;
  hslForm: UntypedFormGroup;
  rgbaForm: UntypedFormGroup;
  rgbaRequiredForm: UntypedFormGroup;

  color5: string = null;
  color6: string = '#F4F';
  color7: string = 'blue';
  color8: string = 'rgba(200,40,30,0.9)';

  disabled = false;


  // last line will not be show in used colors because they are invalid values
  usedStart: string[] = [
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
    '#000zzz',
    'zzzzzz'
  ];

  colors: string[] = [
    '#000zzz',
    'zzzzzz',
    '#ff6633',
    'ff6638',
    'fFb399',
    'rgb(140,140,140)',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF'
  ];

  colorObject: MccColorPickerItem[] = [
    { text: 'Black', value: '#000000' },
    { text: 'White', value: '#FFFFFF' },
    { text: 'Gray', value: '#CCCCCC' }
  ];

  constructor(private formBuilder: UntypedFormBuilder, private mccColorPickerService: MccColorPickerService) {}

  ngOnInit() {
    this.hexForm = this.formBuilder.group({
      color: ['#00FFEE', Validators.required]
    });

    this.rgbForm = this.formBuilder.group({
      color: ['rgb(234, 120, 56)', Validators.required]
    });

    this.hslForm = this.formBuilder.group({
      color: ['hsl(325, 100%, 50%)', Validators.required]
    });

    this.rgbaForm = this.formBuilder.group({
      color: ['rgba(234, 120, 56, 0.45)', Validators.required]
    });

    this.rgbaRequiredForm = this.formBuilder.group({
      color: ['rgba(67, 200, 40, 1)', Validators.required]
    });
  }

  reset(): void {
    this.mccColorPickerService.resetUsedColors();
  }

  onSubmit({ value, valid }): void {
    console.log(value, valid);
  }

  logValue() {
    console.log(this.color5);
  }
}
