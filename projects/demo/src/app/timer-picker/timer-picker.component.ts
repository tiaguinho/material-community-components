import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-timer-picker',
  templateUrl: './timer-picker.component.html',
  styleUrls: ['./timer-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPickerComponent implements OnInit {
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
