import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule, MatIconModule, MatSidenavModule, MatTabsModule } from '@angular/material';
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
