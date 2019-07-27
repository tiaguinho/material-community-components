import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav

  mobile: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.mobile = window.innerWidth < 576;

    window.onresize = () => {
      this.mobile = window.innerWidth < 576;
    }

    this.router.events.subscribe(e => {
      if (
        e.constructor.name === 'NavigationEnd' &&
        this.sidenav.opened
      ) {
        this.sidenav.close();
      }
    });
  }

}
