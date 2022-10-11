import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from './design-system/components/button/button.module';
import { DatatableModule } from './design-system/components/datatable/datatable.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    DatatableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
