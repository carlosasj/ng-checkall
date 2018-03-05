import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AbstractCheckDirective } from './abstract-check.directive';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[checkAll]',
})
export class CheckAllDirective extends AbstractCheckDirective {

  @Output() checkedAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private model: NgModel) {
    super(model);
    this.checkedEmitter = this.checkedAll;
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange = this._onModelChange;

}
