import { CheckContainerDirective } from './directives/check-container.directive';
import { CheckOneDirective } from './directives/check-one.directive';
import { CheckAllDirective } from './directives/check-all.directive';
import { NgModule } from '@angular/core';


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
  ]
})
export class NgCheckAllModule { }
