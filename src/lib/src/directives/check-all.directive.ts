import { Directive, HostListener, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngModel][checkAll]:not([disabled])',
  providers: [NgModel],
})
export class CheckAllDirective implements AfterViewInit {

  @Output() checkedAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() NgModel: boolean;
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private viewInitialized = false;
  private valueToSetAfterViewInit: boolean = undefined;
  private lockFn = function() { return false; };


  @HostListener('ngModelChange', ['$event'])
  onModelChange($event: boolean) {
    if (!this.lockFn()) {
      this.checkedAll.emit($event);
    }
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    if (this.valueToSetAfterViewInit) {
      this.setValue(this.valueToSetAfterViewInit);
    }
  }

  public setAfterViewInit(value: boolean) {
    this.valueToSetAfterViewInit = value;
    if (this.viewInitialized && this.valueToSetAfterViewInit) { this.setValue(this.valueToSetAfterViewInit); }
  }

  public setValue = (value: boolean, runBody = true) => {
    if (runBody) {
      this.NgModel = value;
      this.ngModelChange.emit(this.NgModel);
      // this.model.valueAccessor.writeValue(value);
    }
  }

  public registerLockFn(fn: () => boolean) { this.lockFn = fn; }

}
