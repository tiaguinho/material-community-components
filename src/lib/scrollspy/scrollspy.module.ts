import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { MccScrollspyService } from './scrollspy.service';
import { MccScrollspyGroupDirective, MccScrollspyItemDirective } from './scrollspy.directives';

@NgModule({
  imports: [CommonModule, ScrollDispatchModule],
  providers: [MccScrollspyService, { provide: 'Window', useValue: window }],
  declarations: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
  exports: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
})
export class MccScrollspyModule {}
