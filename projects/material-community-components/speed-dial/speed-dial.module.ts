import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';
import { MccSpeedDialComponent } from './speed-dial.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [MccSpeedDialComponent, MccSpeedDialActionsComponent],
  exports: [MccSpeedDialComponent, MccSpeedDialActionsComponent],
})
export class MccSpeedDialModule { }
