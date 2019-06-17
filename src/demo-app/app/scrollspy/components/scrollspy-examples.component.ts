import { Component, ChangeDetectorRef, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MccScrollspyService, MccScrollspyItemDirective } from '../../../../lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scrollspy-examples',
  templateUrl: './scrollspy-examples.component.html',
  styleUrls: ['./scrollspy-examples.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyExamplesComponent implements OnInit, OnDestroy {
  items: MccScrollspyItemDirective[];

  private _subscription: Subscription;

  constructor(
    private mccScrolspyService: MccScrollspyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._subscription = this.mccScrolspyService.group('My Scrollspy').subscribe(items => {
      this.items = items;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  scrollTo(id: string): void {
    this.mccScrolspyService.scrollTo('My Scrollspy', id);
  }
}
