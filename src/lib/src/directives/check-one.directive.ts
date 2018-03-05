import { Directive, HostListener, forwardRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngModel][checkOne]:not([disabled])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => CheckOneDirective),
      multi: true
    },
  ],
})
export class CheckOneDirective implements ControlValueAccessor, AfterViewInit {

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
