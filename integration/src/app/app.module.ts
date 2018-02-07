import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgCheckAllModule } from 'ng-checkall';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, NgCheckAllModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
