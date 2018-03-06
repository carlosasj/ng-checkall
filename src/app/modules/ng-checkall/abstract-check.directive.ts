import { Directive, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';


export abstract class AbstractCheckDirective {

  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public checkedEmitter: EventEmitter<boolean>;

  private registered = false;
  private lockFn: () => boolean = () => false;
  public isRegistered = () => this.registered;

  constructor(private _model: NgModel) {}

  public registerLockFn(fn: () => boolean) {
    this.registered = true;
    this.lockFn = fn;
  }

  protected _onModelChange($event) {
    if (!this.lockFn() && !this._model.disabled) {
      this.checkedEmitter.emit($event);
    }
  }

  public setValue(value: boolean, runBody = true) {
    if (runBody && !this._model.disabled) {
      this.ngModelChange.emit(value);
      this._model.valueAccessor.writeValue(value);
    }
  }

}
