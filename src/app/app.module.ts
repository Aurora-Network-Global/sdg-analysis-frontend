import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {DropdownModule, InputTextModule, MessageService, MessagesModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {appRouting} from './app.routing';
import {QueryService} from './services/query.service';
import {RunnerService} from './services/runner.service';
import {ResultsService} from './services/results.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProjectService} from './services/project.service';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {ToastModule} from 'primeng/toast';


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
    MessagesModule,
    ClipboardModule,
    ToastModule,
    DropdownModule,
    BrowserAnimationsModule,
    appRouting
  ],
  providers: [HttpClientModule, QueryService, RunnerService, ResultsService, ProjectService, ClipboardService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
