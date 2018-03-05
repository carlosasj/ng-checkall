import { Directive, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AbstractCheckDirective } from './abstract-check.directive';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[checkOne]',
})
export class CheckOneDirective extends AbstractCheckDirective implements AfterViewInit {

  @Output() checkedOne: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private model: NgModel) {
    super(model);
    this.checkedEmitter = this.checkedOne;
  }

  ngAfterViewInit() {
    this.model.valueChanges.subscribe(this._onModelChange.bind(this));
  }

  public getValue() { return this.model.value; }
  public isDisabled() { return this.model.disabled; }

}
