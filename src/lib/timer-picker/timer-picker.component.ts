import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  MccTimerPickerTimeType,
  MccTimerPickerFormat,
  MccTimerPickerHour,
  MccTimerPickerMinute,
  MccTimerPickerPeriod,
  HOURS,
  MINUTES,
} from './timer-picker';

@Component({
  selector: 'mcc-timer-picker',
  templateUrl: './timer-picker.component.html',
  styleUrls: ['./timer-picker.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MccTimerPickerComponent {
  /**
   * Receive selected _hour after confirm
   */
  private _selectedHour: MccTimerPickerHour = '12';

  /**
   * Receive selected _minute after confirm
   */
  private _selectedMinute: MccTimerPickerMinute = '00';

  /**
   * Receive selected _period after confirm
   */
  private _selectedPeriod: MccTimerPickerPeriod = 'am';

  /**
   * Current value (hour/minute) to create the clock
   */
  get clock$(): Observable<string[]> {
    return this._clock.asObservable();
  }
  private _clock: BehaviorSubject<string[]> = new BehaviorSubject(HOURS);

  /**
   * Type there is in focus (hour/minute)
   */
  get focus(): MccTimerPickerTimeType {
    return this._focus;
  }
  set focus(value: MccTimerPickerTimeType) {
    if (value !== this._focus) {
      this._focus = value;
      this._clock.next(this._focus === 'hour' ? HOURS : MINUTES);
    }
  }
  private _focus: MccTimerPickerTimeType = 'hour';

  /**
   * State of the overlay
   */
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: boolean) {
    this._isOpen = coerceBooleanProperty(value);
  }
  private _isOpen: boolean;

  /**
   * Return temporary selected hour (const HOURS)
   */
  get hour(): MccTimerPickerHour {
    return this._hour;
  }
  private _hour: MccTimerPickerHour = '12';

  /**
   * Return temporary selected minute (const MINUTES)
   */
  get minute(): MccTimerPickerMinute {
    return this._minute;
  }
  private _minute: MccTimerPickerMinute = '00';

  /**
   * Return temporary selected period (am/pm)
   */
  get period(): MccTimerPickerPeriod {
    return this._period;
  }
  private _period: MccTimerPickerPeriod = 'am';

  /**
   * Hide Confirm and Cancel buttons
   */
  @Input()
  get hideButtons(): boolean {
    return this._hideButtons;
  }
  set hideButtons(value: boolean) {
    this._hideButtons = coerceBooleanProperty(value);
  }
  private _hideButtons: boolean = false;

  /**
   * Format of the hour to be emited on confirm
   */
  @Input('mccTimerPickerFormat') format: MccTimerPickerFormat = '12';

  @Input('mccTimerPickerMin') min: string = '00:00 am';

  @Input('mccTimerPickerMax') max: string = '12:00 pm';

  /**
   * Change btnCancel label
   */
  @Input() btnCancel: string = 'Cancel';

  /**
   * Change btnConfirm label
   */
  @Input() btnConfirm: string = 'Ok';

  /**
   * Event emited when confirm button is pressed.
   * If buttons are hidden, the event is emited when value is changed
   */
  @Output() selected: EventEmitter<string> = new EventEmitter();

  /**
   * Origin reference of connected timer picker
   */
  trigger: CdkOverlayOrigin;

  /**
   * Set to true when timer picker have been connected with another component
   */
  connected: boolean = false;

  constructor() { }

  /**
   * Return timer option class to create line between the middle of the clock and
   * the option
   */
  getSelectedClass(): string {
    let name = 'selected-index-';
    if (this.focus === 'hour') {
      name += HOURS.findIndex(h => h === this.hour);
    } else {
      name += MINUTES.findIndex(m => m === this.minute);
    }

    return name;
  }

  /**
   * Select option from the clock.
   * @param value MccTimerPickerHour | MccTimerPickerMinute
   */
  select(value: MccTimerPickerHour | MccTimerPickerMinute): void {
    if (this.focus === 'hour') {
      this._hour = <MccTimerPickerHour>value;
      this.focus = 'min';
    } else {
      this._minute = <MccTimerPickerMinute>value;
    }

    // if buttons are hidden, emit new event when value is changed
    if (this._hideButtons) {
      this.confirmSelectedTime();
    }
  }

  /**
   * Returns array containing time, hour and period fragments from time string
   * @param time string
   */
  parseTimeInput(time: string): [number, number, string] {
    const parsed = time.split(/\s|:/).map((fragment, index) => {
      return index === 2 ? fragment : parseInt(fragment, 10);
    });

    if (parsed.length === 2) {
      // assume we are using 24 hour time format
      const hours = parsed[0] as number;
      if (hours > 11) {
        parsed[0] = hours - 12;
        parsed.push('pm');
      } else {
        parsed.push('am');
      }
    }

    return parsed as [number, number, string];
  }

  /**
   * Returns true if option value is not valid
   * @param value MccTimerPickerHour | MccTimerPickerMinute
   */
  isOptionDisabled(value: MccTimerPickerHour | MccTimerPickerMinute): boolean {

    const [minHour, minMinutes, minPeriod] = this.parseTimeInput(this.min);
    const [maxHour, maxMinutes, maxPeriod] = this.parseTimeInput(this.max);

    const optionValue = parseInt(value, 10);
    const selectedHour = parseInt(this._hour, 10);
    const selectedPeriod = this._period;

    if (this.focus === 'hour') {
      if (optionValue < minHour && selectedPeriod === minPeriod) {
        return true;
      } else if (optionValue > maxHour && selectedPeriod === maxPeriod) {
        return true;
      }
    } else {
      if (selectedHour === minHour && selectedPeriod === minPeriod && optionValue < minMinutes) {
        return true;
      } else if (selectedHour === maxHour && selectedPeriod === maxPeriod && optionValue > maxMinutes) {
        return true;
      }
    }

    return false;
  }

  /**
   * Change period of the clock
   * @param period MccTimerPickerPeriod
   */
  changePeriod(period: MccTimerPickerPeriod): void {
    this._period = period;
    // if buttons are hidden, emit new event when value is changed
    if (this._hideButtons) {
      this.confirmSelectedTime();
    }
  }

  /**
   * Update selected color, close the panel and notify the user
   */
  backdropClick(): void {
    this.confirmSelectedTime();
    this._isOpen = false;
  }

  /**
   * Change values to last confirm select time
   */
  cancelSelection(): void {
    this._hour = this._selectedHour;
    this._minute = this._selectedMinute;
    this._period = this._selectedPeriod;
    this._isOpen = false;
  }

  /**
   * Set new values of time and emit new event with the formated timer
   */
  confirmSelectedTime(): void {
    this._selectedHour = this.hour;
    this._selectedMinute = this.minute;
    this._selectedPeriod = this.period;

    // format string to emit selected time
    let formated: string;
    if (this.format === '12') {
      formated = `${this.hour}:${this.minute} ${this.period}`;
    } else {
      let hour: string = this.hour;
      if (this.period === 'pm') {
        hour = `${parseInt(hour) + 12}`;
      }

      formated = `${hour}:${this.minute}`;
    }

    this.selected.emit(formated);

    // only close automatically if button aren't hidden
    if (!this._hideButtons) {
      this._isOpen = false;
    }
  }
}
