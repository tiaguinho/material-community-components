import { Injectable, Inject, OnDestroy } from '@angular/core';
import { MccScrollspyItemDirective } from './scrollspy.directives';
import { MccScrollspyGroup, SCROLLSPY_ANIMATION_SMOOTH } from './scrollspy';
import { Subscription, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class MccScrollspyService implements OnDestroy {
  /**
   * When scroll is from click event, change this attr to true
   * So scroll event obeservable doesn't emit any update
   */
  private _fromClick: boolean = false;

  /**
   * List of scrollspy group
   */
  private data: MccScrollspyGroup[] = [];

  /**
   * Scroll event subscription
   */
  private _scrollSub: Subscription;

  constructor(@Inject('Window') private window: any) {
    // listen to scroll event
    this._scrollSub = fromEvent(window, 'scroll')
      .pipe(debounceTime(50), withLatestFrom(() => window.scrollY))
      .subscribe(position => {
        if (!this._fromClick) {
          this._updateFocused(position);
        }
        this._fromClick = false;
      });
  }

  ngOnDestroy() {
    if (this._scrollSub && !this._scrollSub.closed) {
      this._scrollSub.unsubscribe();
    }
  }

  /**
   * Update information about wich element is on focus
   * @param position number
   */
  private _updateFocused(position: number): void {
    this.data.forEach(group => {
      const items = [];
      group.items.getValue().forEach((item, index) => {
        item.focus = false;
        if (item.top <= position) {
          if (items[index - 1]) {
            items[index - 1].focus = false;
          }

          item.focus = true;
        }

        items.push(item);
      });

      group.items.next(items);
    });
  }

  /**
   * Create new group of items
   * @param name string
   * @param items MccScrollspyItemDirective[]
   * @param animation ScrollBehavior
   */
  create(
    name: string,
    items?: MccScrollspyItemDirective[],
    animation?: ScrollBehavior
  ): MccScrollspyGroup {
    let group: MccScrollspyGroup = this.data.find(group => group.name === name);
    if (!group) {
      group = {
        name: name,
        animation: animation || SCROLLSPY_ANIMATION_SMOOTH,
        items: new BehaviorSubject<MccScrollspyItemDirective[]>(items || []),
      };

      this.data.push(group);
    } else {
      group.items.next(items || []);
    }

    return group;
  }

  /**
   * Return observable of the group
   * @param name string
   */
  group(name: string): Observable<MccScrollspyItemDirective[]> {
    let group: MccScrollspyGroup = this.data.find(g => g.name === name);
    if (!group) {
      group = this.create(name);
    }

    return group.items.asObservable();
  }

  /**
   * Scroll to one of the items
   * @param name string
   * @param id string
   */
  scrollTo(name: string, id: string): void {
    const group: MccScrollspyGroup = this.data.find(group => group.name === name);

    group.items.getValue().forEach(item => {
      item.focus = false;
      if (item.id === id) {
        this._fromClick = true;
        this._updateFocused(item.top);
        window.scrollTo({ top: item.top, behavior: group.animation });
      }
    });
  }
}
