import { Directive, HostListener, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[checkOne]',
  providers: [NgModel],
})
export class CheckOneDirective implements AfterViewInit {

  @Output() checkedOne: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private viewInitialized = false;
  private lockFn = function () { return false; };

  constructor(private model: NgModel) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange($event: boolean) {
    if (!this.lockFn()) {
      this.checkedOne.emit($event);
    }
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
  }

  public getValue() { return this.model.value; }
  public isDisabled() { return this.model.disabled; }
  public registerLockFn(fn: () => boolean) { this.lockFn = fn; }

  public setValue(value: boolean, runBody = true) {
    if (runBody && this.viewInitialized && !this.model.disabled) {
      this.ngModelChange.emit(value);
      this.model.valueAccessor.writeValue(value);
    }
  }

}
