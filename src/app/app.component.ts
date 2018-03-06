import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public checkAll = false;
  public checkItems = [
    { name: 'Check 01', checked: true, disabled: true },
    { name: 'Check 02', checked: true, disabled: false },
    { name: 'Check 03', checked: false, disabled: true },
    { name: 'Check 04', checked: true, disabled: false },
    { name: 'Check 05', checked: true, disabled: true },
    { name: 'Check 06', checked: false, disabled: false },
  ];

  public addItem() {
    this.checkItems.push({ name: 'Check N' + Math.random(), checked: false, disabled: false });
  }

  public toggleItem() {
    this.checkItems[5].checked = !this.checkItems[5].checked;
  }

  public toggleDisabled() {
    this.checkItems[5].disabled = !this.checkItems[5].disabled;
  }
}
