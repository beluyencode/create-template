import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTemplateModule } from './create-template/create-template.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CreateTemplateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
