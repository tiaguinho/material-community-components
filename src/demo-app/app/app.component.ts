import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
  prefix: string;

  ngOnInit() {
    this.prefix = environment.prefix;
  }
}
