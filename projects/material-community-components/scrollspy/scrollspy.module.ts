import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MccScrollspyService } from './scrollspy.service';
import { MccScrollspyGroupDirective, MccScrollspyItemDirective } from './scrollspy.directive';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  providers: [MccScrollspyService, { provide: 'Window', useValue: window }],
  declarations: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
  exports: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
})
export class MccScrollspyModule {}
