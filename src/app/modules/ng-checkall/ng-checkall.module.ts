import { NgModule } from '@angular/core';

import { CheckAllDirective } from './check-all.directive';
import { CheckContainerDirective } from './check-container.directive';
import { CheckOneDirective } from './check-one.directive';

@NgModule({
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
