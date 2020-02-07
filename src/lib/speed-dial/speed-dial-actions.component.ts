import { AfterContentInit, Component, ContentChildren, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { ANIMATION, Z_INDEX } from './animations';
import { DIRECTION } from './directions';

@Component({
  selector: 'mcc-speed-dial-actions',
  templateUrl: './speed-dial-actions.component.html',
  styleUrls: ['./speed-dial-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MccSpeedDialActionsComponent implements AfterContentInit {
  /**
   * Hold all the actions button inside fab speed dial
   */
  @ContentChildren(MatButton) _buttons: QueryList<MatButton>;

  /**
   * Set type of animation will be executed on open/close
   * Type available are: scale | fling
   */
  @Input() set animation(animation: ANIMATION) {
    this._animation.next(animation);
  }
  private _animation: BehaviorSubject<ANIMATION> = new BehaviorSubject('scale');

  /**
   * Last animation the was used
   */
  private _lastAnimationClass: string;

  constructor(private renderer: Renderer2) { }

  /**
   * The z-index style and animation class are handle separate because
   * z-index will be set only one time, and the animation class will be set
   * every time the animation change
   */
  ngAfterContentInit() {
    // set z-index style to each button action
    this._buttons.forEach((button, index) => {
      this.renderer.setStyle(button._elementRef.nativeElement, 'z-index', (Z_INDEX - index));
    });

    // set the animation class to each button action
    this._animation.subscribe(animation => {
      const nextAnimationClass = `speed-dial-item-animation-${animation}`;
      this._buttons.forEach(button => {
        if (this._lastAnimationClass) {
          this.renderer.removeClass(button._elementRef.nativeElement, this._lastAnimationClass);
        }
        this.renderer.addClass(button._elementRef.nativeElement, nextAnimationClass);
      });

      this._lastAnimationClass = nextAnimationClass;
    });
  }

  /**
   * Responsible for change the state of the action buttons to visible
   * 
   * @param direction DIRECTION
   */
  show(direction: DIRECTION) {
    switch (this._animation.value) {
      case 'scale': {
        this._buttons.forEach((button, index) => {
          const transition = 3 + (65 * index);

          this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', `${transition}ms`);
          this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
          this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(1)');
        });
        break;
      }

      case 'fling': {
        const translateFn = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
        const sign = (direction == 'down' || direction == 'right') ? '-' : '';

        this._buttons.forEach(button => {
          this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
          this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
          this.renderer.setStyle(button._elementRef.nativeElement, 'transform', `${translateFn}(${sign}0)`);
        });
      }
    }
  }

  /**
   * Hide all the buttons action
   * 
   * @param direction DIRECTION
   */
  hide(direction: DIRECTION) {
    switch (this._animation.value) {
      case 'scale': {
        this._buttons.forEach((button, index) => {
          const transition = 3 - (65 * index);

          this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', `${transition}ms`);
          this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '0');
          this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(0)');
        });
        break;
      }

      case 'fling': {
        const translateFn = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
        const sign = (direction == 'down' || direction == 'right') ? '-' : '';

        this._buttons.forEach((button, index) => {
          const transform = (55 * (index + 1) - (index * 5));

          this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
          this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
          this.renderer.setStyle(button._elementRef.nativeElement, 'transform', `${translateFn}(${sign}${transform}px)`);
        });
      }
    }
  }
}
