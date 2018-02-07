import { Directive, HostListener, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[checkAll]',
  providers: [NgModel],
})
export class CheckAllDirective implements AfterViewInit {

  @Output() checkedAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private viewInitialized = false;
  private valueToSetAfterViewInit: boolean = undefined;
  private lockFn = function() { return false; };

  constructor(private model: NgModel) { }

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
    if (runBody && this.viewInitialized && !this.model.disabled) {
      this.ngModelChange.emit(value);
      this.model.valueAccessor.writeValue(value);
    }
  }

  public registerLockFn(fn: () => boolean) { this.lockFn = fn; }

}
