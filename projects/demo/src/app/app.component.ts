import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {

  @ViewChild('drawer', { static: true }) sidenav: MatSidenav

  private _isHandset: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
    this.isHandset$.subscribe(result => this._isHandset = result);

    this.router.events.subscribe(e => {
      if (
        e.constructor.name === 'NavigationEnd' &&
        this._isHandset &&
        this.sidenav.opened
      ) {
        this.sidenav.close();
      }
    });
  }

}
