import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatSidenavModule, MatTabsModule } from '@angular/material';
import { MccScrollspyModule } from '../../../lib';

import { ScrollspyComponent } from './scrollspy.component';
import { ScrollspyExamplesComponent } from './components/scrollspy-examples.component';

import { routes } from './scrollspy.router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MccScrollspyModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
  ],
  declarations: [ScrollspyComponent, ScrollspyExamplesComponent],
})
export class ScrollspyModule {}
