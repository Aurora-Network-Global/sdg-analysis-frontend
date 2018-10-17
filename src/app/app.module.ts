import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {InputTextModule, MessagesModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {appRouting} from './app.routing';
import {FileService} from './services/file.service';
import {RunnerService} from './services/runner.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    MessagesModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    appRouting
  ],
  providers: [HttpClientModule, FileService, RunnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
