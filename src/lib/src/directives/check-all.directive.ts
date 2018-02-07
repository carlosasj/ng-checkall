import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[checkAll]',
  providers: [NgModel],
})
export class CheckAllDirective {

  @Output() checkedAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private lockFn = function() { return false; };

  constructor(private model: NgModel) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange($event: boolean) {
    if (!this.lockFn()) {
      this.checkedAll.emit($event);
    }
  }

  public setValue(value: boolean, runBody = true) {
    if (runBody && !this.model.disabled) {
      this.ngModelChange.emit(value);
      this.model.valueAccessor.writeValue(value);
    }
  }

  public registerLockFn(fn: () => boolean) { this.lockFn = fn; }

}
