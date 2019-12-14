import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SPIN_ANIMATION } from './animations';
import { DIRECTION } from './directions';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';

@Component({
  selector: 'mcc-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.scss'],
  animations: [SPIN_ANIMATION],
})
export class MccSpeedDialComponent implements AfterViewInit, OnChanges {
  /**
   * Hold speed-dial-actions component inside this component
   */
  @ContentChild(MccSpeedDialActionsComponent) actions: MccSpeedDialActionsComponent;

  /**
   * Set initial 'open' state
   */
  @Input('open') set isOpen(open: boolean) {
    this._isOpen = coerceBooleanProperty(open);
  }
  get isOpen(): boolean {
    return this._isOpen;
  }
  private _isOpen: boolean = false;

  /**
   * When enabled, handle open/close state on mouse hover
   */
  @Input('mouseHover') set hover(hover: boolean) {
    this._hover = coerceBooleanProperty(hover);
  }
  private _hover: boolean = false;

  /**
   * Enable/disable spin animation when button is clicked or hovered
   */
  @Input() set spin(spin: boolean) {
    this._spin = spin;
  }
  get spin() {
    return this._spin;
  }
  private _spin: boolean = true;

  /**
   * Define the direction of the actions button
   * Directions available are: up | down | left | right
   */
  @Input() set direction(direction: DIRECTION) {
    this._direction = direction;
  }
  get direction(): DIRECTION {
    return this._direction;
  }
  private _direction: DIRECTION = 'up';

  /**
   * Event emitted when open state change
   */
  @Output() openStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  /**
   * Call fab speed dial actions functions to change the
   * visibility of the buttons
   */
  private _setActionsState() {
    if (this._isOpen) {
      this.actions.show(this._direction);
    } else {
      this.actions.hide(this._direction);
    }
  }

  /**
   * Set initial state to the action buttons inside speed-dial-actions
   */
  ngAfterViewInit() {
    this._setActionsState();
  }

  /**
   * 
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('isOpen' in changes && changes['isOpen'].previousValue !== undefined) {
      this._setActionsState();
    }
  }

  /**
   * When mouseHover is enabled and state is closed
   * calls toggle to open the actions
   */
  hoverStart() {
    if (this._hover && !this._isOpen) {
      this.toggle();
    }
  }

  /**
   * When mouseHover is enabled and state is open
   * calls toggle to close the actions
   */
  hoverStop() {
    if (this._hover && this._isOpen) {
      this.toggle();
    }
  }

  /**
   * Change the open state
   */
  toggle() {
    this._isOpen = !this._isOpen;

    this._setActionsState();

    this.openStateChange.emit(this._isOpen);
  }
}
