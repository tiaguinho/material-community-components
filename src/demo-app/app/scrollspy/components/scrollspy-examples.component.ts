import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MccScrollspyService, MccScrollspyItemDirective } from '../../../../lib';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-scrollspy-examples',
  templateUrl: './scrollspy-examples.component.html',
  styleUrls: ['./scrollspy-examples.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyExamplesComponent implements OnInit {
  items: MccScrollspyItemDirective[];

  constructor(
    private mccScrolspyService: MccScrollspyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.mccScrolspyService.group('My Scrollspy').subscribe(items => {
      this.items = items;
      this.changeDetectorRef.detectChanges();
    });
  }

  scrollTo(id: string): void {
    this.mccScrolspyService.scrollTo('My Scrollspy', id);
  }
}
