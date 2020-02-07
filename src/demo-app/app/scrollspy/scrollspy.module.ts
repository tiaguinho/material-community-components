import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MccScrollspyModule } from '../../../lib';
import { ScrollspyExamplesComponent } from './components/scrollspy-examples.component';
import { ScrollspyComponent } from './scrollspy.component';
import { routes } from './scrollspy.router';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MccScrollspyModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatTabsModule,
  ],
  declarations: [ScrollspyComponent, ScrollspyExamplesComponent],
})
export class ScrollspyModule { }
