import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-timer-picker-examples',
  templateUrl: './timer-picker-examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPickerExamplesComponent implements OnInit {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      timer: [''],
    });
  }

  onSubmit({ value, valid }) {
    console.log(valid, value);
  }
}
