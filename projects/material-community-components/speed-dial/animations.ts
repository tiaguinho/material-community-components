import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Types of animation to be executed by speed-dial-actions
 */
export type MccSpeedDialAnimation = 'fling' | 'scale';
export type ANIMATION = MccSpeedDialAnimation; // kept type for backwards-compatibility

/**
 * Default value of action button z-index
 */
export const Z_INDEX = 23;

/**
 * SPIN animation used on speed-dial
 */
export const SPIN_ANIMATION = trigger('spin', [
  state(
    'open',
    style({
      transform: 'rotate(360deg)'
    })
  ),
  state(
    'closed',
    style({
      transform: 'rotate(0deg)'
    })
  ),
  transition('open => closed', [animate('.3s')]),
  transition('closed => open', [animate('.3s')])
]);
