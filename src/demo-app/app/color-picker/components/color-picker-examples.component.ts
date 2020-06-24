import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MccColorPickerItem, MccColorPickerService } from '../../../../lib/color-picker';

@Component({
  selector: 'app-color-picker-examples',
  templateUrl: './color-picker-examples.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerExamplesComponent implements OnInit {
  selectedColor: string;

  changeColor: string;

  form: FormGroup;

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
    'zzzzzz',
  ];

  colors: string[] = [
    '#FF6633',
    '#FFB399',
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
    '#6666FF',
  ];

  items: MccColorPickerItem[] = [
    { text: 'Black', value: '#000000' },
    { text: 'White', value: '#FFFFFF' },
    { text: 'Gray', value: '#CCCCCC' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mccColorPickerService: MccColorPickerService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      color: ['#000000', Validators.required],
    });
  }

  reset(): void {
    this.mccColorPickerService.resetUseColors();
  }

  onSubmit({ value, valid }): void {
    console.log(value, valid);
  }
}
