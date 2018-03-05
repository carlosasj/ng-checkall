import { NgCheckallModule } from './modules/ng-checkall/ng-checkall.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgCheckallModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
