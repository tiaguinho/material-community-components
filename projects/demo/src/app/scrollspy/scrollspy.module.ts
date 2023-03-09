import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { RouterModule } from '@angular/router';
import { ScrollspyExamplesComponent } from './components/scrollspy-examples.component';
import { ScrollspyComponent } from './scrollspy.component';
import { routes } from './scrollspy.router';
import { MccScrollspyModule } from 'material-community-components/scrollspy';



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
