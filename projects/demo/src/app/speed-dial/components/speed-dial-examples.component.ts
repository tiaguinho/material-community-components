import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DIRECTION, MccSpeedDialDirection } from '../../../../../material-community-components/speed-dial/directions';
import { ANIMATION, MccSpeedDialAnimation } from '../../../../../material-community-components/speed-dial/animations';

@Component({
  selector: 'app-speed-dial-examples',
  templateUrl: './speed-dial-examples.component.html',
  styleUrls: ['./speed-dial-examples.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeedDialExamplesComponent implements OnInit {
  directions: string[] = ['up', 'down', 'left', 'right'];

  animations: string[] = ['scale', 'fling'];

  form: FormGroup;

  get direction(): MccSpeedDialDirection {
    return this.form.get('direction').value;
  }

  get open(): boolean {
    return this.form.get('open').value;
  }

  get spin(): boolean {
    return this.form.get('spin').value;
  }

  get mouse_hover(): boolean {
    return this.form.get('mouse_hover').value;
  }

  get animation(): MccSpeedDialAnimation {
    return this.form.get('animation').value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      direction: ['up'],
      open: [false],
      spin: [true],
      mouse_hover: [false],
      animation: ['scale']
    });
  }
}
