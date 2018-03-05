import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckAllDirective } from './check-all.directive';
import { CheckContainerDirective } from './check-container.directive';
import { CheckOneDirective } from './check-one.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CheckAllDirective,
    CheckContainerDirective,
    CheckOneDirective,
  ],
  exports: [
    CheckAllDirective,
    CheckContainerDirective,
    CheckOneDirective,
  ],
})
export class NgCheckallModule { }
