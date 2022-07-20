import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-timer-picker-examples',
  templateUrl: './timer-picker-examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPickerExamplesComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      timer: [''],
    });
  }

  onSubmit({ value, valid }) {
    console.log(valid, value);
  }
}
