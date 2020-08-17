import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SpeedDialApiComponent } from './components/speed-dial-api.component';
import { SpeedDialExamplesComponent } from './components/speed-dial-examples.component';
import { SpeedDialComponent } from './speed-dial.component';
import { routes } from './speed-dial.router';
import { MccSpeedDialModule } from 'material-community-components/speed-dial';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MccSpeedDialModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatGridListModule
  ],
  declarations: [SpeedDialComponent, SpeedDialApiComponent, SpeedDialExamplesComponent],
})
export class SpeedDialModule { }
