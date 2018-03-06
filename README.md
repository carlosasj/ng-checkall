# NgCheckall

How many times you had to deal with the behavior of a List or Table full of checkboxes and one checkbox at the top to "Check all" the others?

This Angular 4+ lib aims to encapsulate this logic and reduce development time, bugs and duplicated code.

## Demo

[Go to Demo](https://carlosasj.github.io/ng-checkall/)

## Installation

    npm i --save ng-checkall

or

    yarn add ng-checkall

## Usage

* Add `NgCheckallModule` to the Module you want to have this behavior

```js
import { NgCheckallModule } from 'ng-checkall';

@NgModule({
    ...
    imports: [ NgCheckallModule ]
})
```

* Use it in your HTML elements, for example:

```html
<div checkContainer> <!-- You need a container to wrap your checkboxes -->

  <div> <!-- Put a `checkAll` directive on the input that should behave as the "Checl All" checkbox -->
    <input checkAll type="checkbox" name="checkAllStart" id="checkAllStart" [(ngModel)]="checkAll">
    <label for="checkAllStart">Check All</label>
  </div>

  <hr>

  <div *ngFor="let c of checkItems">
    <!-- Put a `checkOne` directive on each item -->
    <input checkOne type="checkbox" [name]="c.name" [id]="c.name" [disabled]="c.disabled" [(ngModel)]="c.checked">
    <label [for]="c.name">{{c.name}}</label>
  </div>

  <hr>

  <div> <!-- Accepts multiple 'Check All' -->
    <input checkAll type="checkbox" name="checkAllEnd" id="checkAllEnd" [(ngModel)]="checkAll">
    <label for="checkAllEnd">Check All</label>
  </div>

</div>
```

## Common issues

* Programmatically setting the `checkAll` model will **not** mark all the checkboxes. Instead, prefer iterate over your items and marking all of them as `checked` (and then the `checkAll` model will be automatically marked)

* Right now, one container will handle all the checkboxes inside it, so it will **not** work properly if you have a Table where each column should be a container with its own `checkAll` and `checkOne` set of directives.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## For any questions, suggestions, or feature requests
Please, [file an issue](https://github.com/carlosasj/ng-checkall/issues) or fork then open a Pull Request.

###### This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.
