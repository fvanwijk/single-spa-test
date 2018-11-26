import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SingleSpaModule } from 'single-spa-angular-cli/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SingleSpaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
