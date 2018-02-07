import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public allLanguagesSelected = false;
  public languagesList = [
    { disabled: true, checked: false, name: 'Assembly (please, don\'t)' },
    { disabled: false, checked: false, name: 'C++' },
    { disabled: false, checked: true, name: 'CSS' },
    { disabled: false, checked: false, name: 'Go' },
    { disabled: false, checked: true, name: 'HTML' },
    { disabled: true, checked: false, name: 'Java' },
    { disabled: true, checked: true, name: 'Javascript (required)' },
    { disabled: false, checked: false, name: 'PHP' },
    { disabled: false, checked: false, name: 'Python' },
    { disabled: false, checked: false, name: 'Ruby' },
    { disabled: false, checked: false, name: 'Rust' },
    { disabled: false, checked: false, name: 'Swift' },
  ];
  constructor() { }
}
