import { Directive, HostListener, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngModel][checkOne]:not([disabled])',
  providers: [NgModel],
})
export class CheckOneDirective implements AfterViewInit {

  @Output() checkedOne: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() NgModel: boolean;
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private viewInitialized = false;
  private lockFn = function () { return false; };

  @HostListener('ngModelChange', ['$event'])
  onModelChange($event: boolean) {
    if (!this.lockFn()) {
      this.checkedOne.emit($event);
    }
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
  }

  public getValue() { return this.NgModel; }
  public isDisabled() { return false; }
  public registerLockFn(fn: () => boolean) { this.lockFn = fn; }

  public setValue = (value: boolean, runBody = true) => {
    if (runBody) {
      this.NgModel = value;
      this.ngModelChange.emit(this.NgModel);
      // this.model.valueAccessor.writeValue(value);
    }
  }

}
