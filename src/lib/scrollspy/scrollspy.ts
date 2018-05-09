import { MccScrollspyItemDirective } from './scrollspy.directives';
import { BehaviorSubject } from 'rxjs';

// scrollspy animations
export const SCROLLSPY_ANIMATION_SMOOTH = 'smooth';
export const SCROLLSPY_ANIMATION_INSTANT = 'instant';
export const SCROLLSPY_ANIMATION_AUTO = 'auto';

/**
 * Scrollspy group
 */
export interface MccScrollspyGroup {
  name: string;
  animation: ScrollBehavior;
  items: BehaviorSubject<MccScrollspyItemDirective[]>;
}
