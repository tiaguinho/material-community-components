import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';

import { routes } from './app.router';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
