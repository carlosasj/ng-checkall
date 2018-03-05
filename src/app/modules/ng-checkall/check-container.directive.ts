import { CheckAllDirective } from './check-all.directive';
import { CheckOneDirective } from './check-one.directive';
import { Directive, ContentChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AbstractCheckDirective } from './abstract-check.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[checkContainer]',
})
export class CheckContainerDirective implements AfterViewInit, OnDestroy {
  @ContentChildren(CheckAllDirective) checkAllDirectives: QueryList<CheckAllDirective>;
  @ContentChildren(CheckOneDirective) checkOneDirectives: QueryList<CheckOneDirective>;
  private subscribes: Subscription[] = [];
  private lock = false;

  constructor() { }

  private process<T extends AbstractCheckDirective>(list: QueryList<T>, fn: (val: boolean) => void) {
    const generatedFn = (item: T) => {
      if (!item.isRegistered()) {
        item.registerLockFn(this.getLock.bind(this));
        this.subscribes.push(item.checkedEmitter.subscribe(fn));
      }
    };
    list.forEach(generatedFn);
    this.subscribes.push(list.changes.subscribe(l => l.forEach(generatedFn)));
  }

  ngAfterViewInit() {
    this.process<CheckOneDirective>(this.checkOneDirectives, this.onCheckOne.bind(this));
    this.process<CheckAllDirective>(this.checkAllDirectives, this.onCheckAll.bind(this));
  }

  ngOnDestroy() {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  private getCheckboxesToCheck() { return this.checkOneDirectives.filter(item => !item.isDisabled()); }
  private getLock() { return this.lock; }

  public onCheckOne(event: boolean) {
    this.lock = true;
    if (event) {
      setTimeout(this.updateView.bind(this), 1);
    } else {
      this.checkAllDirectives.forEach(item => item.setValue(false, this.lock));
      this.lock = false;
    }
  }

  public onCheckAll(event: boolean) {
    this.lock = true;
    this.getCheckboxesToCheck().forEach(item => item.setValue(event, this.lock));
    this.lock = false;
  }

  public updateView() {
    const checked = this.getCheckboxesToCheck().map<boolean>(item => item.getValue());
    const result = checked.every(i => i);
    this.checkAllDirectives.forEach(item => item.setValue(result, this.lock));
    this.lock = false;
  }

}
